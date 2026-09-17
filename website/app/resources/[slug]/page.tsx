import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getContentItemBySlug } from '../../lib/content'
import { formatDate, formatBytes } from '../../lib/content/format'
import ContentPreview from '../../components/content/preview'

async function Resource({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const item = await getContentItemBySlug(slug, 'resources')

    if (!item) {
        notFound()
    }

    return (
        <article className="flex flex-col w-full max-w-2xl">
            <h1 className="text-2xl font-semibold">{item.title}</h1>
            <p className="text-sm text-neutral-500 mb-4">
                Uploaded {formatDate(item.date, true)}
                {item.file && ` · ${formatBytes(item.file.size)}`}
            </p>
            {item.file?.downloadUrl && (
                <a
                    href={item.file.downloadUrl}
                    download={item.file.name}
                    className="text-sm underline mb-4 self-start"
                >
                    Download {item.file.name}
                </a>
            )}
            <ContentPreview item={item} />
        </article>
    );
}

// Mirrors Resource's title/meta/content layout so the Suspense fallback
// doesn't cause a layout shift when real content arrives.
function ResourceSkeleton() {
    return (
        <div className="flex flex-col w-full max-w-2xl animate-pulse">
            <div className="h-8 w-2/3 rounded bg-foreground/10" />
            <div className="h-4 w-1/4 rounded bg-foreground/10 mt-3 mb-4" />
            <div className="h-64 w-full rounded bg-foreground/10" />
        </div>
    );
}

export default function ResourcePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    return (
        <main className="flex flex-col items-center justify-center gap-6 w-full py-6">
            <Suspense fallback={<ResourceSkeleton />}>
                <Resource params={params} />
            </Suspense>
        </main>
    );
}
