import { Card } from "./parts/cards";
import type { FilterDims } from "../../types/filters";

export function CardGrid2x2({ heading, subheading }: FilterDims) {
    return (
        <div className="w-full px-16 py-4">
            <div className="inline-flex flex-col justify-start items-start gap-2">
                <div className="justify-start text-2xl">{heading}</div>
                <div className="justify-center text-xl">{subheading}</div>
            </div>
            <div className="py-4 grid grid-cols-2 gap-16">
                <Card title="Title" body="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." />
                <Card title="Title" body="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." />
                <Card title="Title" body="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." />
                <Card title="Title" body="Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." />
            </div>
        </div>
    );
}