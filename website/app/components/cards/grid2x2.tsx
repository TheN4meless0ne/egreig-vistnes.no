import { cardGrid2x2Props } from "../../lib/filters";
import { ProjectCard } from "./parts/cards";
import Link from "../parts/link";

export function CardGrid2x2({ heading, subheading, items }: cardGrid2x2Props) {
    return (
        <div className="w-full px-16 py-4">
            <div className="inline-flex flex-col justify-start items-start gap-2">
                <div className="justify-start text-2xl">{heading}</div>
                <div className="justify-center text-xl">{subheading}</div>
            </div>
            <div className="py-4 grid md:grid-cols-2 gap-16">
                {items.length === 0 && (
                    <p className="text-neutral-500">Nothing featured yet.</p>
                )}
                {items.map((item, index) => {
                    const card = <ProjectCard title={item.title} body={item.body} />;
                    const key = `${item.title}-${index}`;
                    return item.href ? (
                        <Link key={key} href={item.href} className="block">
                            {card}
                        </Link>
                    ) : (
                        <div key={key}>{card}</div>
                    );
                })}
            </div>
        </div>
    );
}
