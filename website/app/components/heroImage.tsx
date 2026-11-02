type HeroImageProps = {
    image: string; // base path without extension, e.g. ".../images/sunset"
    alt: string;
    title: string;
    subtitle: string;
};

const widths = [960, 1600, 2560];

const srcSet = (base: string, ext: string) =>
    widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");

export default function HeroImage({ image, alt, title, subtitle }: HeroImageProps) {
    return (
        <div className="relative">
            <picture>
                <source type="image/avif" srcSet={srcSet(image, "avif")} sizes="100vw" />
                <source type="image/webp" srcSet={srcSet(image, "webp")} sizes="100vw" />
                <img
                    src={`${image}-1600.jpg`}
                    srcSet={srcSet(image, "jpg")}
                    sizes="100vw"
                    alt={alt}
                    width={2560}
                    height={703}
                    fetchPriority="high"
                    className="w-full h-auto object-cover"
                />
            </picture>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white md:gap-2">
                <h1 className="text-center font-bold text-3xl md:text-7xl">{title}</h1>
                <p className="text-center md:text-3xl">{subtitle}</p>
            </div>
        </div>
    );
}
