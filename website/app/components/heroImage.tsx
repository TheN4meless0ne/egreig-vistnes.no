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
                    sizes="(max-width: 767px) 950px, (max-width: 1512px) 1512px, 100vw"
                    alt={alt}
                    width={2560}
                    height={703}
                    fetchPriority="high"
                    className="w-full h-auto min-h-[170px] md:min-h-[415px] object-cover object-center"
                />
            </picture>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 md:gap-2">
                <h1 className="text-center font-bold whitespace-nowrap leading-[1.1] text-[length:min(calc((100vw_-_3rem)/9.2),4.5rem)]">{title}</h1>
                <p className="text-center text-xl md:text-3xl">{subtitle}</p>
            </div>
        </div>
    );
}
