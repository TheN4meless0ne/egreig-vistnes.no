import { Suspense } from 'react'
import { getDocsContent } from '../lib/content'
import { formatDate, formatBytes } from '../lib/content/format'
import Link from '../components/parts/link'
import { Tag } from '../components/parts/tag'

export const metadata = {
    title: 'Documents',
    description: 'Read my documents.',
}

async function DocumentsList() {
    const documents = await getDocsContent()

    if (documents.length === 0) {
        return <p className="text-neutral-500">No documents yet.</p>
    }

    return documents.map((doc) => (
        <article key={doc.slug} className="border-b border-neutral-200 pb-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
                <Link href={`/docs/${doc.slug}`} className="hover:underline">
                    {doc.title}
                </Link>
                {doc.featured && <Tag label="Featured on homepage" />}
            </h2>
            <p className="text-sm text-neutral-500">
                {formatDate(doc.date, true)}
                {doc.file && ` · ${formatBytes(doc.file.size)}`}
            </p>
            {doc.summary && <p>{doc.summary}</p>}
        </article>
    ))
}

// Mirrors DocumentsList's article dimensions so the Suspense fallback
// doesn't cause a layout shift when real content arrives.
function DocumentsListSkeleton() {
    return Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="border-b border-neutral-200 pb-4 animate-pulse">
            <div className="h-6 w-1/2 rounded bg-foreground/10" />
            <div className="h-4 w-1/4 rounded bg-foreground/10 mt-2" />
            <div className="h-4 w-full rounded bg-foreground/10 mt-2" />
        </div>
    ))
}

export default function DocsPage() {
    return (
        <main className="flex flex-col items-center justify-center gap-6 w-full py-6">
            <h1 className="text-2xl font-semibold">Documents</h1>
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                <Suspense fallback={<DocumentsListSkeleton />}>
                    <DocumentsList />
                </Suspense>
            </div>
        </main>
    );
}
