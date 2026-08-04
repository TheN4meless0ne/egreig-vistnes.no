import { IconButton, FooterLink } from "./parts/button";
import Link from "./parts/link";
import Logo from "./logo";
import { getTrademark } from "../lib/trademark";

const ICON_LINKS = [
    { icon: "LinkedIn", destination: "https://www.linkedin.com/in/egreig-vistnes/" },
    { icon: "Github", destination: "https://github.com/TheN4meless0ne" },
    { icon: "XLogo", destination: "https://x.com/egreigvistnes" },
    { icon: "YouTube", destination: "https://www.youtube.com/@egreig-vistnes" },
];

const NAV_LINKS = [
    { name: "Portfolio", destination: "/portfolio" },
    { name: "Socials", destination: "/socials" },
    { name: "Resources", destination: "/resources" },
    { name: "Contact", destination: "/contact" },
];

const RESOURCE_LINKS = [
    { name: "Education", destination: "/" },
    { name: "Work Experience", destination: "/" },
    { name: "Certifications", destination: "/" },
    { name: "Projects", destination: "/" },
];

export default async function Footer() {
    const trademark = await getTrademark();

    return (
        <div className="grid grid-cols-3 items-center w-full px-8 md:px-48">
            <div className="grid grid-row-2 ml-4 pb-15 gap-y-4">
                <div>
                    <Link href="/"><Logo /></Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-2 max-w-50">
                    {ICON_LINKS.map((link) => (
                        <IconButton key={link.icon} destination={link.destination} icon={link.icon} />
                    ))}
                </div>
                <p className="text-xs text-gray-400">{trademark}</p>
            </div>
            <div className="grid grid-row-2 ml-4 gap-y-4">
                <div>
                    <p className="font-bold">Explore</p>
                </div>
                <div className="grid grid-row-4 gap-y-2">
                    {NAV_LINKS.map((item) => (
                        <FooterLink key={item.destination} name={item.name} destination={item.destination} />
                    ))}
                </div>
            </div>
            <div className="grid grid-row-2 ml-4 gap-y-4">
                <div>
                    <p className="font-bold">Resources</p>
                </div>
                <div className="grid grid-row-4 gap-y-2">
                    {RESOURCE_LINKS.map((item) => (
                        <FooterLink key={item.destination} name={item.name} destination={item.destination} />
                    ))}
                </div>
            </div>
        </div>
    );
}