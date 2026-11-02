import { getLocalDocuments } from "./content/localSource";
import { getSharePointItemsMetadataCached } from "./content/sharepointSource";
import type { ContentItem } from "./content/types";
import type { searchItem } from "./filters";
import { NAV_LINKS } from "./navigation";

/**
 * Site search over everything the site actually serves: the top-level pages,
 * the local MDX documents (including their full text), and the metadata of the
 * SharePoint Documents, Projects and Resources libraries (title, description
 * and file name).
 *
 * SharePoint file bodies are not searched yet. Fetching every file on every
 * search would be far too slow, so full-text search over SharePoint content
 * waits for the Supabase index in phase 2. When that lands, buildIndex() is
 * the only part that needs to change.
 */

type SearchKind = "Page" | "Document" | "Project" | "Resource";

type IndexEntry = {
    title: string;
    description: string;
    href: string;
    kind: SearchKind;
    keywords: string[];
    /** Full text, only for local documents. Not returned to the client. */
    body?: string;
};

const SHAREPOINT_LIBRARIES: { key: string; kind: SearchKind; basePath: string }[] = [
    { key: "Documents", kind: "Document", basePath: "/docs" },
    { key: "Projects", kind: "Project", basePath: "/docs" },
    { key: "Resources", kind: "Resource", basePath: "/resources" },
];

const MAX_QUERY_TERMS = 8;

/** Lower-cases and removes accents, so "kafe" matches "Kafé". Characters like æ and ø have no accent to remove and are kept as they are. */
function normalise(text: string): string {
    return text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
}

/** Turns Markdown into roughly plain text, so link URLs and syntax don't produce matches. */
function stripMarkdown(markdown: string): string {
    return markdown
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/<[^>]+>/g, " ")
        .replace(/[#>*_`~|-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function fromSharePoint(item: ContentItem, kind: SearchKind, basePath: string): IndexEntry {
    return {
        title: item.title,
        description: item.summary ?? "",
        href: `${basePath}/${item.slug}`,
        kind,
        keywords: item.file ? [item.file.name, item.file.extension] : [],
    };
}

async function buildIndex(): Promise<IndexEntry[]> {
    const pages: IndexEntry[] = NAV_LINKS.map((link) => ({
        title: link.name,
        description: link.description,
        href: link.destination,
        kind: "Page",
        keywords: link.keywords ?? [],
    }));

    const localDocs: IndexEntry[] = getLocalDocuments().map((doc) => ({
        title: doc.title,
        description: doc.summary ?? "",
        href: `/docs/${doc.slug}`,
        kind: "Document",
        keywords: [],
        body: doc.content ? stripMarkdown(doc.content) : undefined,
    }));

    // Cached for hours and dropped early by /api/revalidate-sharepoint, so a
    // search doesn't wait on the backend and Graph. If the backend is down
    // these come back empty, and search still works for pages and local docs.
    const libraries = await Promise.all(
        SHAREPOINT_LIBRARIES.map(async ({ key, kind, basePath }) =>
            (await getSharePointItemsMetadataCached(key)).map((item) => fromSharePoint(item, kind, basePath))
        )
    );

    return [...pages, ...localDocs, ...libraries.flat()];
}

/** Scores one term against one entry. Returns 0 when the term appears nowhere. */
function scoreTerm(entry: IndexEntry, term: string): number {
    const title = normalise(entry.title);
    if (title.split(/[\s\-_/]+/).some((word) => word.startsWith(term))) return 10;
    if (title.includes(term)) return 6;
    if (entry.keywords.some((keyword) => normalise(keyword).includes(term))) return 4;
    if (normalise(entry.description).includes(term)) return 3;
    if (entry.body && normalise(entry.body).includes(term)) return 1;
    return 0;
}

function toResult(entry: IndexEntry): searchItem {
    return { title: entry.title, description: entry.description, href: entry.href, kind: entry.kind, keywords: entry.keywords };
}

/**
 * Every term in the query must match somewhere in an entry. Results are
 * ordered by score: title matches first, then keywords and file names, then
 * descriptions, then body text. An empty query returns the top-level pages.
 */
export async function searchSite(query: string, limit: number): Promise<searchItem[]> {
    const index = await buildIndex();
    const terms = normalise(query).split(/\s+/).filter(Boolean).slice(0, MAX_QUERY_TERMS);

    if (terms.length === 0) {
        return index.filter((entry) => entry.kind === "Page").slice(0, limit).map(toResult);
    }

    const scored: { entry: IndexEntry; score: number }[] = [];
    for (const entry of index) {
        let total = 0;
        for (const term of terms) {
            const score = scoreTerm(entry, term);
            if (score === 0) {
                total = 0;
                break;
            }
            total += score;
        }
        if (total > 0) scored.push({ entry, score: total });
    }

    scored.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));
    return scored.slice(0, limit).map(({ entry }) => toResult(entry));
}
