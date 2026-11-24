import { panelImageProps } from "../lib/filters";

// Same scheme as HeroImage: `image` is a base path without extension, and the
// blob store holds `<base>-<width>.<avif|webp|jpg>` for each width below.
const widths = [400, 800, 1200];

const srcSet = (base: string, ext: string) =>
    widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");

export type ImageSide = "left" | "right";

// "auto"      – the original behaviour: 4/5 on mobile, 4/3 on tablet, and on desktop the image stretches to match the height of the text.
// "portrait"  – fixed 4/5 at every breakpoint.
// "landscape" – fixed 4/3 at every breakpoint, with a wider column on desktop.
export type ImageAspect = "auto" | "portrait" | "landscape";

export type PanelImageOptions = {
    imageSide?: ImageSide;
    aspect?: ImageAspect;
    // Any object-position value, e.g. "50% 30%" or "center top" - Overrides the per-breakpoint defaults below.
    objectPosition?: string;
};

const layouts: Record<
    ImageAspect,
    { picture: string; img: string; sizes: string; width: number; height: number }
> = {
    auto: {
        picture: "xl:w-[433px]",
        img: "aspect-[4/5] object-[50%_20%] sm:aspect-[4/3] sm:object-[50%_10%] xl:aspect-auto xl:object-[50%_20%] xl:absolute xl:inset-0 xl:h-full",
        sizes: "(min-width: 1280px) 433px, 100vw",
        width: 337,
        height: 582,
    },
    portrait: {
        picture: "sm:w-full sm:max-w-md sm:self-center xl:w-[433px] xl:max-w-none",
        img: "aspect-[4/5] object-[50%_20%]",
        sizes: "(min-width: 1280px) 433px, (min-width: 640px) 448px, 100vw",
        width: 800,
        height: 1000,
    },
    landscape: {
        picture: "xl:w-[560px] xl:self-center",
        img: "aspect-[4/3] object-[50%_20%]",
        sizes: "(min-width: 1280px) 560px, 100vw",
        width: 1200,
        height: 900,
    },
};

const sides: Record<ImageSide, string> = {
    left: "xl:flex-row",
    right: "xl:flex-row-reverse",
};

export default function PanelImage({
    image,
    alt,
    heading,
    subheading,
    bodies,
    imageSide = "left",
    aspect = "auto",
    objectPosition,
}: panelImageProps & PanelImageOptions) {
    const layout = layouts[aspect];

    return (
        <div className={`flex flex-col ${sides[imageSide]} px-6 md:px-10 lg:px-16 py-8 gap-8 xl:gap-12`}>
            <picture className={`relative block shrink-0 -mx-6 sm:mx-0 ${layout.picture}`}>
                <source type="image/avif" srcSet={srcSet(image, "avif")} sizes={layout.sizes} />
                <source type="image/webp" srcSet={srcSet(image, "webp")} sizes={layout.sizes} />
                <img
                    src={`${image}-800.jpg`}
                    srcSet={srcSet(image, "jpg")}
                    sizes={layout.sizes}
                    alt={alt}
                    width={layout.width}
                    height={layout.height}
                    loading="lazy"
                    decoding="async"
                    style={objectPosition ? { objectPosition } : undefined}
                    className={`w-full h-auto object-cover ${layout.img}`}
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
