import Link from "next/link";
import type { FilterDims } from "../../types/filters";

export default function NavButton({ name, destination }: FilterDims) {
    return (
        <button className="p-2 rounded-lg inline-flex justify-center items-center gap-2 hover:bg-gray-100 dark:hover:bg-neutral-800">
            <div>
                <Link href={destination}>{name}</Link>
            </div>
        </button>
    );
}
