import CircleAlert from "../../parts/icon/alert";

type FilterDims = {
    title: string;
    body: string;
};

export default function Card({ title, body }: FilterDims) {
    return (
        <div className="self-stretch self-stretch min-w-60 inline-flex justify-start items-start gap-4 flex-wrap content-start">
            <div className="w-6 h-6 relative overflow-hidden">
                <CircleAlert />
            </div>
            <div className="flex-1 min-w-40 inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-start text-Text-Default-Default text-2xl font-semibold leading-7">{title}</div>
                    <div className="self-stretch justify-start text-Text-Default-Secondary text-base font-normal leading-6">{body}</div>
                </div>
            </div>
        </div>
    );
}