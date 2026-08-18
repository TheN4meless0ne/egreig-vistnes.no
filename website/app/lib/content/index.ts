import { getLocalDocuments } from "./localSource";
import { getSharePointItems, loadSharePointTextContent } from "./sharepointSource";
import type { ContentItem } from "./types";

function sortByDateDesc(items: ContentItem[]): ContentItem[] {
    return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Local MDX articles + the SharePoint "documents" library, merged into one date-sorted list. */
export async function getDocsContent(): Promise<ContentItem[]> {
    const [local, sharepoint] = await Promise.all([
        Promise.resolve(getLocalDocuments()),
        getSharePointItems("documents"),
    ]);
    return sortByDateDesc([...local, ...sharepoint]);
}

/** The SharePoint "resources" library, date-sorted. */
export async function getResourcesContent(): Promise<ContentItem[]> {
    return sortByDateDesc(await getSharePointItems("resources"));
}

/**
 * Resolves a single item by slug for a detail page. For SharePoint
 * markdown/MDX items this also hydrates `content`, since the listing
 * functions above deliberately skip that fetch for every item.
 */
export async function getContentItemBySlug(
    slug: string,
    listing: "docs" | "resources"
): Promise<ContentItem | undefined> {
    const items = listing === "docs" ? await getDocsContent() : await getResourcesContent();
    const item = items.find((candidate) => candidate.slug === slug);
    if (!item) return undefined;

    const needsTextContent =
        item.source === "sharepoint" &&
        (item.previewKind === "markdown" || item.previewKind === "mdx") &&
        !item.content;

    if (needsTextContent) {
        const content = await loadSharePointTextContent(item);
        return { ...item, content };
    }

    return item;
}

export type { ContentItem, ContentFile, ContentSourceKind, PreviewKind } from "./types";
