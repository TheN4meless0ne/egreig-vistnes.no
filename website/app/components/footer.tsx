import Link from "next/link";
import Logo from "./logo";

import { IconButton, FooterLink } from "./parts/button";

export default function Footer() {
    return (
        <div className="grid grid-cols-3 px-25 span-2 flex justify-end items-center pt-5">
            <div className="grid grid-row-2 ml-4 min-w-100 max-w-262 pb-15 gap-y-4">
                <div>
                    <Link href="/"><Logo /></Link>
                </div>
                <div className="grid grid-cols-5 gap-x-2 max-w-50">
                    <IconButton destination="https://www.linkedin.com/in/egreigvistnes/" icon="LinkedIn" />
                    <IconButton destination="https://github.com/TheN4meless0ne" icon="Github" />
                    <IconButton destination="https://www.instagram.com/egreigvistnes" icon="Instagram" />
                    <IconButton destination="https://x.com/thenmelessne" icon="XLogo" />
                    <IconButton destination="https://www.youtube.com/@then4meless0ne" icon="YouTube" />
                </div>
            </div>
            <div className="grid grid-row-2 ml-4 min-w-100 max-w-262 gap-y-4">
                <div>
                    <p className="font-bold">Explore</p>
                </div>
                <div className="grid grid-row-4 gap-y-2">
                    <FooterLink name="Portfolio" destination="/portfolio" />
                    <FooterLink name="Socials" destination="/socials" />
                    <FooterLink name="Resources" destination="/resources" />
                    <FooterLink name="Contact" destination="/contact" />
                </div>
            </div>
            <div className="grid grid-row-2 ml-4 min-w-100 max-w-262 gap-y-4">
                <div>
                    <p className="font-bold">Resources</p>
                </div>
                <div className="grid grid-row-4 gap-y-2">
                    <FooterLink name="Education" destination="/" />
                    <FooterLink name="Work Experience" destination="/" />
                    <FooterLink name="Certifications" destination="/" />
                    <FooterLink name="Projects" destination="/" />
                </div>
            </div>
        </div>
    );
}