import Image from "./image";
import type { FilterDims } from "../types/filters";

export default function HeroImage({ src, alt, title, subtitle }: FilterDims) {
    return (
        <span className="relative">
            <Image alt={alt} src={src} />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white md:gap-2">
                <h1 className="text-center justify-start font-bold text-3xl md:text-7xl">{title}</h1>
                <p className="text-center justify-center md:text-3xl">{subtitle}</p>
            </div>
        </span>
    );
}