import { panelImageProps } from "../lib/filters";

// Same scheme as HeroImage: `image` is a base path without extension, and the
// blob store holds `<base>-<width>.<avif|webp|jpg>` for each width below.
const widths = [400, 800, 1200];

const srcSet = (base: string, ext: string) =>
    widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");

const sizes = "(min-width: 1024px) 433px, (min-width: 640px) 67vw, 100vw";

export default function PanelImage({ image, alt, heading, subheading, bodies }: panelImageProps) {
    return (
        <div className="flex flex-col lg:flex-row px-6 md:px-10 lg:px-16 py-8 gap-8 lg:gap-12">
            <picture className="relative block shrink-0 -mx-6 sm:mx-auto sm:w-2/3 lg:mx-0 lg:w-[433px]">
                <source type="image/avif" srcSet={srcSet(image, "avif")} sizes={sizes} />
                <source type="image/webp" srcSet={srcSet(image, "webp")} sizes={sizes} />
                <img
                    src={`${image}-800.jpg`}
                    srcSet={srcSet(image, "jpg")}
                    sizes={sizes}
                    alt={alt}
                    width={337}
                    height={582}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto aspect-[4/5] object-cover object-[50%_20%] sm:aspect-auto lg:absolute lg:inset-0 lg:h-full"
                />
            </picture>
            <div className="flex flex-col gap-6 justify-center">
                <div>
                    <div className="text-2xl font-semibold">{heading}</div>
                    <div className="text-xl">{subheading}</div>
                </div>
                {bodies.map((body, i) => (
                    <div key={i}>{body}</div>
                ))}
            </div>
        </div>
    );
}
