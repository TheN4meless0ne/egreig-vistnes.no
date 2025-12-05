import Link from "next/link";

type FilterDims = {
    name: string;
    destination: string;
};

export default function NavButton({ name, destination }: FilterDims) {
    return (
        <button>
            <div data-state="Active" className="p-2 rounded-lg inline-flex justify-center items-center gap-2 hover:bg-gray-100 hover:cursor-pointer">
                <Link href={destination} className="justify-center text-base font-normal leading-4">{name}</Link>
            </div>
        </button>
    );
}
