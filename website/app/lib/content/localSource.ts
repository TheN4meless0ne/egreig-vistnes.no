import { getDocuments } from "../../docs/utils";
import type { ContentItem } from "./types";

/** Wraps the local .md/.mdx files under app/docs/files as ContentItems. */
export function getLocalDocuments(): ContentItem[] {
    return getDocuments().map((doc) => ({
        slug: doc.slug,
        title: doc.metadata.title,
        summary: doc.metadata.summary,
        source: "local",
        date: doc.metadata.publishedAt,
        previewKind: "mdx",
        content: doc.content,
    }));
}
