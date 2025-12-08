import Image from "./image";
import type { FilterDims } from "../types/filters";

export default function PanelImage({ src, alt, heading, subheading, body1, body2 }: FilterDims) {
    return (
        <div className="w-full max-w-[1200px] px-4 py-8 inline-flex justify-start items-center gap-12">
            <Image alt={alt} src={src} />
            <div className="h-80 min-w-72 inline-flex flex-col justify-start items-start gap-6">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-start text-2xl font-semibold leading-7">{heading}</div>
                    <div className="self-stretch justify-center text-xl font-normal leading-6">{subheading}</div>
                </div>
                <div className="self-stretch inline-flex justify-start items-start">
                    <div className="flex-1 justify-start text-base font-normal leading-6">{body1}</div>
                </div>
                <div className="self-stretch inline-flex justify-start items-start">
                    <div className="flex-1 justify-start text-base font-normal leading-6">{body2}</div>
                </div>
            </div>
        </div>
    );
}