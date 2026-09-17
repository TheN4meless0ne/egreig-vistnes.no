// Mirrors CardGrid2x2's layout and ProjectCard's dimensions so the
// Suspense fallback doesn't cause a layout shift when real content arrives.
export function CardGrid2x2Skeleton({ heading, subheading }: { heading: string; subheading: string }) {
    return (
        <div className="w-full px-16 py-4">
            <div className="inline-flex flex-col justify-start items-start gap-2">
                <div className="justify-start text-2xl">{heading}</div>
                <div className="justify-center text-xl">{subheading}</div>
            </div>
            <div className="py-4 grid md:grid-cols-2 gap-16">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="inline-flex justify-start items-start gap-4 animate-pulse">
                        <div className="w-6 h-6 rounded bg-foreground/10 shrink-0" />
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="h-6 w-2/3 rounded bg-foreground/10" />
                            <div className="h-4 w-full rounded bg-foreground/10" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
