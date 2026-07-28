import Link from "./link";

type NavButtonProps = {
    name: string;
    destination: string;
};

export default function NavButton({ name, destination }: NavButtonProps) {
    return (
        <button className="p-2 rounded-lg inline-flex justify-center items-center gap-2 hover:bg-gray-100 dark:hover:bg-neutral-800">
            <div>
                <Link href={destination}>{name}</Link>
            </div>
        </button>
    );
}
