import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getDocuments, formatDate } from '../utils'

const mdxComponents = {
    h1: (props) => <h1 className="text-2xl font-semibold mt-6 mb-2" {...props} />,
    h2: (props) => <h2 className="text-xl font-semibold mt-6 mb-2" {...props} />,
    h3: (props) => <h3 className="text-lg font-medium mt-4 mb-2" {...props} />,
    p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
    ul: (props) => <ul className="list-disc list-inside mb-4" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside mb-4" {...props} />,
    a: (props) => <a className="underline hover:no-underline" {...props} />,
    code: (props) => <code className="bg-neutral-100 rounded px-1 py-0.5" {...props} />,
    blockquote: (props) => (
        <blockquote className="border-l-2 border-neutral-300 pl-4 italic mb-4" {...props} />
    ),
}

export function generateStaticParams() {
    return getDocuments().map((doc) => ({ slug: doc.slug }))
}

export default async function DocumentPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const doc = getDocuments().find((d) => d.slug === slug)

    if (!doc) {
        notFound()
    }

    return (
        <main className="flex flex-col items-center justify-center gap-6 w-full py-6">
            <article className="flex flex-col w-full max-w-2xl">
                <h1 className="text-2xl font-semibold">{doc.metadata.title}</h1>
                <p className="text-sm text-neutral-500 mb-4">
                    {formatDate(doc.metadata.publishedAt, true)}
                </p>
                <MDXRemote
                    source={doc.content}
                    components={mdxComponents}
                    options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
            </article>
        </main>
    );
}
