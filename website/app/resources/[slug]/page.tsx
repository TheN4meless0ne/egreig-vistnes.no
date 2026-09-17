import { notFound } from 'next/navigation'
import { getContentItemBySlug } from '../../lib/content'
import { formatDate, formatBytes } from '../../lib/content/format'
import ContentPreview from '../../components/content/preview'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function ResourcePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const item = await getContentItemBySlug(slug, 'resources')

    if (!item) {
        notFound()
    }

    return (
        <main className="flex flex-col items-center justify-center gap-6 w-full py-6">
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
        </main>
    );
}
