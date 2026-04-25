import CircleAlert from "../../parts/icon/alert";

export { Card };

type CardProps = {
    title: string;
    body: string;
};

function Card({ title, body }: CardProps) {
    return (
        <div className="inline-flex justify-start items-start gap-4 flex-wrap content-start">
            <div className="w-6 h-6">
                <CircleAlert />
            </div>
            <div className="flex-1 inline-flex flex-col">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="text-2xl font-semibold">{title}</div>
                    <div>{body}</div>
                </div>
            </div>
        </div>
    );
}

function projectCard ({ title, body }: CardProps) {
    return (
        <div className="inline-flex justify-start items-start gap-4 flex-wrap content-start">
            <div className="w-6 h-6">
                <CircleAlert />
            </div>
            <div className="flex-1 inline-flex flex-col">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="text-2xl font-semibold">{title}</div>
                    <div>{body}</div>
                </div>
            </div>
        </div>
    );
}