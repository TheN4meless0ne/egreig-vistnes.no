import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdxComponents";
import type { ContentItem } from "../../lib/content/types";

/**
 * Renders a ContentItem's detail-page preview according to its previewKind.
 * Local docs and SharePoint .md/.mdx files render through the same MDX
 * pipeline; PDFs and Office files (docx/xlsx/pptx/...) render via embedded
 * iframes against the file's (time-limited) download URL — these pages must
 * stay dynamically rendered (see `export const dynamic = 'force-dynamic'`
 * on the pages that use this) so that URL is never baked into a stale
 * static page.
 */
export default function ContentPreview({ item }: { item: ContentItem }) {
    if ((item.previewKind === "mdx" || item.previewKind === "markdown") && item.content) {
        return (
            <MDXRemote
                source={item.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
        );
    }

    if (item.previewKind === "pdf" && item.file?.downloadUrl) {
        return (
            <iframe
                src={item.file.downloadUrl}
                title={item.title}
                className="w-full h-[80vh] rounded-lg border border-foreground/20"
            />
        );
    }

    if (item.previewKind === "office" && item.file?.downloadUrl) {
        const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            item.file.downloadUrl
        )}`;
        return (
            <iframe
                src={viewerUrl}
                title={item.title}
                className="w-full h-[80vh] rounded-lg border border-foreground/20"
            />
        );
    }

    return (
        <p className="text-neutral-500">
            No preview is available for this file
            {item.file ? ` (.${item.file.extension})` : ""}.
            {item.file?.downloadUrl ? " Use the download link above instead." : ""}
        </p>
    );
}
