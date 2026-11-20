import { IconButton, FooterLink } from "./parts/button";
import Link from "./parts/link";
import Logo from "./logo";
import { getTrademark } from "../lib/trademark";

const ICON_LINKS = [
    { icon: "LinkedIn", destination: "https://linkedin.egreig-vistnes.no" },
    { icon: "Github", destination: "https://github.egreig-vistnes.no" },
    { icon: "XLogo", destination: "https://x.egreig-vistnes.no" },
    { icon: "YouTube", destination: "https://youtube.egreig-vistnes.no" },
];

const NAV_LINKS = [
    { name: "Portfolio", destination: "/portfolio" },
    { name: "Resources", destination: "/resources" },
    { name: "Documents", destination: "/docs" },
    { name: "Contact", destination: "/contact" },
];

const RESOURCE_LINKS = [
    { name: "Privacy Statement", destination: "/privacy" },
    { name: "Work Experience", destination: "/" },
    { name: "Certifications", destination: "/" },
    { name: "Projects", destination: "/" },
];

function IconLinks() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-2 w-fit md:w-auto max-w-50">
            {ICON_LINKS.map((item) => (
                <IconButton key={item.icon} destination={item.destination} icon={item.icon} />
            ))}
        </div>
    );
}

function ExploreLinks() {
    return (
        <div className="grid grid-row-auto gap-y-2">
            {NAV_LINKS.map((item) => (
                <FooterLink key={item.destination} name={item.name} destination={item.destination} />
            ))}
        </div>
    );
}

function ResourcesLinks() {
    return (
        <div className="grid grid-row-auto gap-y-2">
            {RESOURCE_LINKS.map((item) => (
                <FooterLink key={item.destination} name={item.name} destination={item.destination} />
            ))}
        </div>
    );
}

export default async function Footer() {
    const trademark = await getTrademark();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full items-start px-6 md:px-48">
            <div className="grid grid-cols-[auto_auto] justify-center gap-x-12 items-start md:grid-cols-1 md:justify-normal md:ml-4 md:gap-y-2">
                <div className="grid gap-y-0 md:contents">
                    <div className="md:order-1">
                        <Link href="/"><Logo /></Link>
                    </div>
                    <p className="text-xs text-gray-500 md:order-3">{trademark}</p>
                </div>
                <div className="md:order-2">
                    <IconLinks />
                </div>
            </div>
            <Link href="/privacy" className="py-2 justify-self-center text-xs text-gray-400 underline md:hidden">Privacy Statement</Link>
            <div className="hidden md:grid grid-row-2 ml-4 gap-y-2 self-start">
                <div>
                    <p className="font-bold">Explore</p>
                </div>
                <ExploreLinks />
            </div>
            <div className="hidden md:grid grid-row-2 ml-4 gap-y-2 self-start">
                <div>
                    <p className="font-bold">Resources</p>
                </div>
                <ResourcesLinks />
            </div>
        </div>
    );
}
