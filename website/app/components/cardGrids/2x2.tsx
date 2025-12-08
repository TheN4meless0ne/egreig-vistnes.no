import Card from "./parts/card";

type FilterDims = {
    heading: string;
    subheading: string;
};

export function CardGrid2x2({ heading, subheading }: FilterDims) {
    return (
        <div className="w-full max-w-[1200px] px-4 py-8">
            <div className="inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-Text-Default-Default text-2xl font-semibold leading-7">{heading}</div>
                <div className="self-stretch justify-center text-Text-Default-Secondary text-xl font-normal leading-6">{subheading}</div>
            </div>
            <div className="py-4 grid grid-cols-2 gap-12">
                <Card title="Title" body="Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. " />
                <Card title="Title" body="Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. " />
                <Card title="Title" body="Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. " />
                <Card title="Title" body="Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. " />
            </div>
        </div>
    );
}