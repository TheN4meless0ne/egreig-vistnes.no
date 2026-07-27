import Link from "next/link";
import type { FilterDims } from "../../types/filters";

import LinkedInIcon from "./icon/linkedin";
import GithubIcon from "./icon/github";
import InstagramIcon from "./icon/instagram";
import XLogoIcon from "./icon/xLogo";
import YouTubeIcon from "./icon/youtube";

export function NavbarButton({ name, destination }: FilterDims) {
    return (
        <button>
            <div data-state="Active" className="p-2 rounded-lg inline-flex justify-center items-center gap-2 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:cursor-pointer">
                <Link href={destination} className="justify-center text-base font-normal leading-4">
                    {name}
                </Link>
            </div>
        </button>
    );
}

export function IconButton({ destination, icon }: FilterDims) {
    const iconComponents: { [key: string]: React.ReactNode } = {
        LinkedIn: <LinkedInIcon />,
        Github: <GithubIcon />,
        Instagram: <InstagramIcon />,
        XLogo: <XLogoIcon />,
        YouTube: <YouTubeIcon />,
    };

    const IconComponent = iconComponents[icon];

    if (!IconComponent) {
        return null; // Return null if the icon is not found
    }

    return (
        <Link href={destination}>
            {IconComponent}
        </Link>
    );
}

export function FooterLink({ name, destination }: FilterDims) {
    return (
        <Link href={destination} className="hover:underline">
            {name}
        </Link>
    );
}