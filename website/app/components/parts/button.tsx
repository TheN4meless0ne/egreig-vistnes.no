import Link from "./link";

type NavButtonProps = {
    name: string;
    destination: string;
};

import LinkedInIcon from "./icon/social/linkedin";
import GithubIcon from "./icon/social/github";
import InstagramIcon from "./icon//social/instagram";
import XLogoIcon from "./icon/social/xLogo";
import YouTubeIcon from "./icon/social/youtube";

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