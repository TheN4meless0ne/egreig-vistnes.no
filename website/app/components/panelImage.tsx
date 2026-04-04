import Image from "./parts/image";

type PanelImageProps = {
    image: string;
    alt: string;
    heading: string;
    subheading: string;
    body1: string;
    body2: string;
};

export default function PanelImage({ image, alt, heading, subheading, body1, body2 }: PanelImageProps) {
    return (
        <div className="flex flex-col lg:flex-row px-6 md:px-10 lg:px-16 py-8 gap-8 lg:gap-12">
            <Image alt={alt} src={image} />
            <div className="flex flex-col gap-6">
                <div>
                    <div className="text-2xl font-semibold">{heading}</div>
                    <div className="text-xl">{subheading}</div>
                </div>
                <div>{body1}</div>
                <div>{body2}</div>
            </div>
        </div>
    );
}