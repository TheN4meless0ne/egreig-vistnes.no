/** Where a content item's data came from. */
export type ContentSourceKind = "local" | "sharepoint";

/**
 * How an item should be rendered on its detail page.
 * - "mdx"/"markdown": full text preview via MDXRemote (local files are always
 *   "mdx"; SharePoint .md files are "markdown", .mdx are "mdx" — both render
 *   through the same pipeline).
 * - "pdf": embedded via an <iframe> pointing at the file's download URL.
 * - "office": embedded via the Office Online viewer (Word/Excel/PowerPoint).
 * - "none": no inline preview — download/open link only.
 */
export type PreviewKind = "mdx" | "markdown" | "pdf" | "office" | "none";

/** SharePoint-only file metadata, present when source is "sharepoint". */
export type ContentFile = {
    name: string;
    extension: string;
    size: number;
    downloadUrl: string | null;
    webUrl: string;
    libraryKey: string;
};

export type ContentItem = {
    slug: string;
    title: string;
    summary?: string;
    source: ContentSourceKind;
    /** ISO date used for sorting/display — publishedAt for local docs, last-modified for SharePoint items. */
    date: string;
    previewKind: PreviewKind;
    /** Raw MDX/Markdown body. Populated for local docs up front; for SharePoint
     * items it's only loaded on demand (see sharepointSource.loadSharePointTextContent),
     * so list pages don't fetch every file's contents just to show a title. */
    content?: string;
    file?: ContentFile;
};
