import Image from "./image";
import type { FilterDims } from "../types/filters";

export default function HeroImage({ src, alt, title, subtitle }: FilterDims) {
    return (
        <span className="relative">
            <Image alt={alt} src={src} />
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 text-white">
                <div className="self-stretch text-center justify-start text-7xl font-bold leading-[86.40px]">{title}</div>
                <div className="self-stretch text-center justify-center text-3xl font-normal leading-10">{subtitle}</div>
            </div>
        </span>
    );
}