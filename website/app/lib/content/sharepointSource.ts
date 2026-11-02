import { cacheLife, cacheTag } from "next/cache";
import type { ContentItem, PreviewKind } from "./types";

// Server-side only: this must hit the Flask backend directly, not the
// "/api/*" rewrite in next.config.ts (that rewrite only applies to requests
// that land on the Next.js server, e.g. client-side fetches — it does
// nothing for server components / build-time fetches, which have no
// "current origin" to resolve a relative URL against).
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5001";

const MARKDOWN_EXTENSIONS = new Set(["md"]);
const MDX_EXTENSIONS = new Set(["mdx"]);
const PDF_EXTENSIONS = new Set(["pdf"]);
const OFFICE_EXTENSIONS = new Set(["doc", "docx", "ppt", "pptx", "xls", "xlsx"]);

function previewKindForExtension(extension: string): PreviewKind {
    const ext = extension.toLowerCase();
    if (MDX_EXTENSIONS.has(ext)) return "mdx";
    if (MARKDOWN_EXTENSIONS.has(ext)) return "markdown";
    if (PDF_EXTENSIONS.has(ext)) return "pdf";
    if (OFFICE_EXTENSIONS.has(ext)) return "office";
    return "none";
}

type RawLibraryItem = {
    id: string;
    name: string;
    title: string;
    featured: boolean;
    description: string;
    extension: string;
    size: number;
    created_at: string;
    modified_at: string;
    download_url: string | null;
    web_url: string;
};

async function fetchLibraryOrThrow(libraryKey: string): Promise<RawLibraryItem[]> {
    const res = await fetch(`${BACKEND_URL}/api/library/${libraryKey}`, {
        // SharePoint download URLs are time-limited (Graph pre-authenticated
        // links expire after roughly an hour), so this must never be cached
        // across requests — always re-check with the backend. Callers that
        // don't need download URLs can cache at a higher level instead (see
        // getSharePointItemsMetadataCached).
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Backend returned ${res.status} for library "${libraryKey}"`);
    }

    const data = (await res.json()) as { items?: RawLibraryItem[] };
    return data.items ?? [];
}

async function fetchLibrary(libraryKey: string): Promise<RawLibraryItem[]> {
    try {
        return await fetchLibraryOrThrow(libraryKey);
    } catch {
        // Missing Azure config (503), Graph outage, backend unreachable (e.g.
        // not running locally during dev/build) — degrade to "no items"
        // rather than failing the whole page.
        return [];
    }
}

function toContentItem(raw: RawLibraryItem, libraryKey: string): ContentItem {
    return {
        slug: `${libraryKey}-${encodeURIComponent(raw.id)}`,
        title: raw.title,
        summary: raw.description || undefined,
        source: "sharepoint",
        date: raw.modified_at || raw.created_at,
        featured: raw.featured,
        previewKind: previewKindForExtension(raw.extension),
        file: {
            name: raw.name,
            extension: raw.extension,
            size: raw.size,
            downloadUrl: raw.download_url,
            webUrl: raw.web_url,
            libraryKey,
        },
    };
}

/** Lists one SharePoint library (see LIBRARY_FOLDERS in the backend) as ContentItems. Metadata only — no file content is fetched here. */
export async function getSharePointItems(libraryKey: string): Promise<ContentItem[]> {
    const rawItems = await fetchLibrary(libraryKey);
    return rawItems.map((raw) => toContentItem(raw, libraryKey));
}

/**
 * Cached, metadata-only listing of one SharePoint library, for pages that
 * show titles/summaries but never link straight to the file (e.g. the
 * homepage's featured projects). Download URLs are stripped because they
 * expire, so nothing time-limited ever lands in the cache.
 *
 * If the backend is down, this returns [] with the short "seconds" cache
 * profile instead of throwing — a throw inside "use cache" fails the whole
 * build during prerendering, and caching [] for hours would hide the cards
 * long after a brief blip. The short profile also keeps a failed result out
 * of the static shell, so it's retried at request time.
 *
 * Revalidate early with revalidateTag(`sharepoint-${libraryKey}`), e.g. via
 * POST /api/revalidate-sharepoint?library=Projects.
 */
export async function getSharePointItemsMetadataCached(libraryKey: string): Promise<ContentItem[]> {
    "use cache";
    cacheTag(`sharepoint-${libraryKey}`);

    try {
        const rawItems = await fetchLibraryOrThrow(libraryKey);
        cacheLife("hours");
        return rawItems.map((raw) => {
            const item = toContentItem(raw, libraryKey);
            return item.file ? { ...item, file: { ...item.file, downloadUrl: null } } : item;
        });
    } catch {
        cacheLife("seconds");
        return [];
    }
}

/** Fetches the raw text body of a markdown/MDX SharePoint item for its detail-page preview. Called on demand (one item at a time), not from the listing pages. */
export async function loadSharePointTextContent(item: ContentItem): Promise<string | undefined> {
    if (!item.file?.downloadUrl) return undefined;

    try {
        const res = await fetch(item.file.downloadUrl, { cache: "no-store" });
        if (!res.ok) return undefined;
        return await res.text();
    } catch {
        return undefined;
    }
}
