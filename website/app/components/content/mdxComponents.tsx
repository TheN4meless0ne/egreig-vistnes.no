// Shared MDX rendering styles for any content preview (local docs and
// SharePoint markdown/MDX files alike) — extracted from docs/[slug]/page.tsx
// so components/content/preview.tsx can reuse it.
export const mdxComponents = {
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
};
