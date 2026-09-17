import { Suspense } from 'react'
import { getResourcesContent } from '../lib/content'
import { formatDate, formatBytes } from '../lib/content/format'
import Link from '../components/parts/link'
import DownloadIcon from '../components/parts/icon/download'
import EyeIcon from '../components/parts/icon/eye'

export const metadata = {
    title: 'Resources',
    description: 'Access my resources and materials.',
}

async function ResourcesList() {
    const resources = await getResourcesContent()

    if (resources.length === 0) {
        return <p className="text-neutral-500">No resources yet.</p>
    }

    return resources.map((item) => (
        <article
            key={item.slug}
            className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-4"
        >
            <div className="min-w-0">
                {item.file?.downloadUrl ? (
                    <a
                        href={item.file.downloadUrl}
                        download={item.file.name}
                        className="text-lg font-medium hover:underline truncate block"
                    >
                        {item.file.name}
                    </a>
                ) : (
                    <span className="text-lg font-medium truncate block">
                        {item.title}
                    </span>
                )}
                <p className="text-sm text-neutral-500">
                    Uploaded {formatDate(item.date)}
                    {item.file && ` · ${formatBytes(item.file.size)}`}
                </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
                {item.previewKind !== 'none' && (
                    <Link
                        href={`/resources/${item.slug}`}
                        className="p-2 rounded-lg transition-colors hover:bg-foreground/10 active:bg-foreground/20"
                    >
                        <EyeIcon />
                        <span className="sr-only">
                            Preview {item.file?.name ?? item.title}
                        </span>
                    </Link>
                )}
                {item.file?.downloadUrl && (
                    <a
                        href={item.file.downloadUrl}
                        download={item.file.name}
                        className="p-2 rounded-lg transition-colors hover:bg-foreground/10 active:bg-foreground/20"
                    >
                        <DownloadIcon />
                        <span className="sr-only">Download {item.file.name}</span>
                    </a>
                )}
            </div>
        </article>
    ))
}

// Mirrors ResourcesList's article dimensions so the Suspense fallback
// doesn't cause a layout shift when real content arrives.
function ResourcesListSkeleton() {
    return Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-4 animate-pulse">
            <div className="min-w-0 flex-1">
                <div className="h-6 w-1/2 rounded bg-foreground/10" />
                <div className="h-4 w-1/3 rounded bg-foreground/10 mt-2" />
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <div className="h-9 w-9 rounded-lg bg-foreground/10" />
                <div className="h-9 w-9 rounded-lg bg-foreground/10" />
            </div>
        </div>
    ))
}

export default function ResourcesPage() {
    return (
        <main className="flex flex-col items-center justify-center gap-6 w-full py-6">
            <h1 className="text-2xl font-semibold">Resources</h1>
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                <Suspense fallback={<ResourcesListSkeleton />}>
                    <ResourcesList />
                </Suspense>
            </div>
        </main>
    );
}
