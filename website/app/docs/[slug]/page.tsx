import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getContentItemBySlug } from '../../lib/content'
import { formatDate, formatBytes } from '../../lib/content/format'
import ContentPreview from '../../components/content/preview'

async function Document({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const doc = await getContentItemBySlug(slug, 'docs')

    if (!doc) {
        notFound()
    }

    return (
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
    );
}

// Mirrors Document's title/meta/content layout so the Suspense fallback
// doesn't cause a layout shift when real content arrives.
function DocumentSkeleton() {
    return (
        <div className="flex flex-col w-full max-w-2xl animate-pulse">
            <div className="h-8 w-2/3 rounded bg-foreground/10" />
            <div className="h-4 w-1/4 rounded bg-foreground/10 mt-3 mb-4" />
            <div className="h-64 w-full rounded bg-foreground/10" />
        </div>
    );
}

export default function DocumentPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    return (
        <main className="flex flex-col items-center justify-center gap-6 w-full py-6">
            <Suspense fallback={<DocumentSkeleton />}>
                <Document params={params} />
            </Suspense>
        </main>
    );
}
