import Link from 'next/link'

export const metadata = {
    title: 'Resources',
    description: 'Access my resources and materials.',
}

const RESOURCES = [
    { name: "Documents", destination: "/docs" },
    { name: "Education", destination: "/education" },
    { name: "Work Experience", destination: "/work-experience" },
    { name: "Certifications", destination: "/certifications" },
    { name: "Projects", destination: "/projects" },

];

export default function ResourcesPage() {
    return (
        <main className="flex flex-col items-center justify-center gap-6 py-6">
            <h1 className="text-2xl font-semibold">Downloadable Resources</h1>
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                {RESOURCES.map((item) => (
                    <article key={item.name} className="border-b border-neutral-200 pb-4">
                        <h2 className="text-lg font-medium">
                            <Link href={item.destination} className="hover:underline">
                                {item.name}
                            </Link>
                        </h2>
                    </article>
                ))}
            </div>
        </main>
    );
}
