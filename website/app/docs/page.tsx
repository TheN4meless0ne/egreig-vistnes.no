import Link from 'next/link'
import { getDocuments, formatDate } from './utils'

export const metadata = {
    title: 'Documents',
    description: 'Read my documents.',
}

export default function DocsPage() {
    const documents = getDocuments()

    return (
        <main className="flex flex-col items-center justify-center gap-6 w-full py-6">
            <h1 className="text-2xl font-semibold">Documents</h1>
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                {documents.length === 0 && (
                    <p className="text-neutral-500">No documents yet.</p>
                )}
                {documents.map((doc) => (
                    <article key={doc.slug} className="border-b border-neutral-200 pb-4">
                        <h2 className="text-lg font-medium">
                            <Link href={`/docs/${doc.slug}`} className="hover:underline">
                                {doc.metadata.title}
                            </Link>
                        </h2>
                        <p className="text-sm text-neutral-500">
                            {formatDate(doc.metadata.publishedAt, true)}
                        </p>
                        <p>{doc.metadata.summary}</p>
                    </article>
                ))}
            </div>
        </main>
    );
}
