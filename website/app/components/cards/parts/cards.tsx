import CircleAlert from "../../parts/icon/alert";

export { Card, ProjectCard, ContactCard };

type CardProps = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    body: string;
    link: string;
    label: string;
    value: string;
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

function ProjectCard ({ title, body }: CardProps) {
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

function ContactCard ({ icon: Icon, label, link, value }: CardProps) {
    return (
        <div className="inline-flex justify-start items-start gap-4 flex-wrap content-start p-4">
            <div className="py-3">
                <Icon />
            </div>
            <div>
                <h1 className="text-lg font-semibold">{label}</h1>
                <a href={`${link}:${value}`} className="text-muted-foreground">{value}</a>
            </div>
        </div>
    );
}