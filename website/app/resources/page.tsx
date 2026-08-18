import { getResourcesContent } from '../lib/content'
import { formatDate, formatBytes } from '../lib/content/format'
import Link from '../components/parts/link'
import DownloadIcon from '../components/parts/icon/download'
import EyeIcon from '../components/parts/icon/eye'

// SharePoint download links are time-limited; render this page fresh on
// every request rather than baking a stale link into a static build.
export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Resources',
    description: 'Access my resources and materials.',
}

export default async function ResourcesPage() {
    const resources = await getResourcesContent()

    return (
        <main className="flex flex-col items-center justify-center gap-6 w-full py-6">
            <h1 className="text-2xl font-semibold">Resources</h1>
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                {resources.length === 0 && (
                    <p className="text-neutral-500">No resources yet.</p>
                )}
                {resources.map((item) => (
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
                ))}
            </div>
        </main>
    );
}
