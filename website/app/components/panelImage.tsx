import Image from "./image";
import type { FilterDims } from "../types/filters";

export default function PanelImage({ heading, subheading }: FilterDims) {
    return (
        <div className="w-full max-w-[1200px] px-4 py-8 inline-flex justify-start items-center gap-12">
            <img className="h-80" src="https://placehold.co/1024x768" />
            <div className="h-80 min-w-72 inline-flex flex-col justify-start items-start gap-6">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-start text-Text-Default-Default text-2xl font-semibold font-['Inter'] leading-7">Heading</div>
                    <div className="self-stretch justify-center text-Text-Default-Secondary text-xl font-normal font-['Inter'] leading-6">Subheading</div>
                </div>
                <div className="self-stretch inline-flex justify-start items-start">
                    <div className="flex-1 justify-start text-Text-Default-Default text-base font-normal font-['Inter'] leading-6">Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:</div>
                </div>
                <div className="self-stretch inline-flex justify-start items-start">
                    <div className="flex-1 justify-start text-Text-Default-Default text-base font-normal font-['Inter'] leading-6">Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.</div>
                </div>
            </div>
        </div>
    );
}