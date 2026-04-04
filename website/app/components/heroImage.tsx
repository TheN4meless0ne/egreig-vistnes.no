import Image from "./parts/image";

type HeroImageProps = {
    image: string;
    alt: string;
    title: string;
    subtitle: string;
};

export default function HeroImage({ image, alt, title, subtitle }: HeroImageProps) {
    return (
        <span className="relative">
            <Image alt={alt} src={image} />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white md:gap-2">
                <h1 className="text-center justify-start font-bold text-3xl md:text-7xl">{title}</h1>
                <p className="text-center justify-center md:text-3xl">{subtitle}</p>
            </div>
        </span>
    );
}