import { notFound } from 'next/navigation'
import { getContentItemBySlug } from '../../lib/content'
import { formatDate, formatBytes } from '../../lib/content/format'
import ContentPreview from '../../components/content/preview'

// Same reasoning as docs/page.tsx: SharePoint download URLs expire, so this
// can't be statically generated once and served forever.
export const dynamic = 'force-dynamic'

export default async function DocumentPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const doc = await getContentItemBySlug(slug, 'docs')

    if (!doc) {
        notFound()
    }

    return (
        <main className="flex flex-col items-center justify-center gap-6 w-full py-6">
            <article className="flex flex-col w-full max-w-2xl">
                <h1 className="text-2xl font-semibold">{doc.title}</h1>
                <p className="text-sm text-neutral-500 mb-4">
                    {formatDate(doc.date, true)}
                    {doc.file && ` · ${formatBytes(doc.file.size)}`}
                </p>
                {doc.file?.downloadUrl && (
                    <a
                        href={doc.file.downloadUrl}
                        download={doc.file.name}
                        className="text-sm underline mb-4 self-start"
                    >
                        Download {doc.file.name}
                    </a>
                )}
                <ContentPreview item={doc} />
            </article>
        </main>
    );
}
