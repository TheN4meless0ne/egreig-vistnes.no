// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata = {
    title: 'Portfolio',
    description: 'See my projects and work experience.',
}

export default function PortfolioPage() {
    return (
        <main className="flex flex-col items-center justify-center gap-6 w-full py-6">
            <h1 className="text-2xl font-semibold">🚧 This page is currently under development 🚧</h1>
        </main>
    );
}
