import Link from "./link";

import LinkedInIcon from "./icon/social/linkedin";
import GithubIcon from "./icon/social/github";
import InstagramIcon from "./icon/social/instagram";
import XLogoIcon from "./icon/social/xLogo";
import YouTubeIcon from "./icon/social/youtube";

import { navButtonProps, iconButtonProps } from "../../types/filters";

export function NavbarButton({ name, destination }: navButtonProps) {
    return (
        <Link
            href={destination}
            className="p-2 rounded-lg inline-flex justify-center items-center gap-2 text-base font-normal leading-4 transition-colors hover:bg-foreground/10 active:bg-foreground/20 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
            {name}
        </Link>
    );
}

export function IconButton({ destination, icon }: iconButtonProps) {
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

export function FooterLink({ name, destination }: navButtonProps) {
    return (
        <Link href={destination} className="hover:underline">
            {name}
        </Link>
    );
}