import Link from "next/link";
import Logo from "./logo";
import LinkedInIcon from "./parts/icon/social/linkedin";
import GithubIcon from "./parts/icon/social/github";
import InstagramIcon from "./parts/icon/social/instagram";
import XLogoIcon from "./parts/icon/social/xLogo";
import YouTubeIcon from "./parts/icon/social/youtube";

export default function Footer() {
    return (
        <div className="grid grid-cols-3 items-center w-full px-8 md:px-48">
            <div className="grid grid-row-2 ml-4 pb-15 gap-y-4">
                <div>
                    <Link href="/"><Logo /></Link>
                </div>
                <div className="grid grid-cols-5 gap-x-2 max-w-50">
                    <div><Link href="https://www.linkedin.com/in/egreig-vistnes"><LinkedInIcon /></Link></div>
                    <div><Link href="https://github.com/TheN4meless0ne"><GithubIcon /></Link></div>
                    <div><Link href="https://www.instagram.com/egreigvistnes"><InstagramIcon /></Link></div>
                    <div><Link href="https://x.com/thenmelessne"><XLogoIcon /></Link></div>
                    <div><Link href="https://www.youtube.com/@then4meless0ne"><YouTubeIcon /></Link></div>
                </div>
            </div>
            <div className="grid grid-row-2 ml-4 gap-y-4">
                <div>
                    <p className="font-bold">Explore</p>
                </div>
                <div className="grid grid-row-4 gap-y-2">
                    <div><Link href="/portfolio" className="hover:underline">Portfolio</Link></div>
                    <div><Link href="/socials" className="hover:underline">Socials</Link></div>
                    <div><Link href="/resources" className="hover:underline">Resources</Link></div>
                    <div><Link href="/contact" className="hover:underline">Contact</Link></div>
                </div>
            </div>
            <div className="grid grid-row-2 ml-4 gap-y-4">
                <div>
                    <p className="font-bold">Resources</p>
                </div>
                <div className="grid grid-row-4 gap-y-2">
                    <div><Link href="/" className="hover:underline">Education</Link></div>
                    <div><Link href="/" className="hover:underline">Work Experience</Link></div>
                    <div><Link href="/" className="hover:underline">Certifications</Link></div>
                    <div><Link href="/" className="hover:underline">Projects</Link></div>
                </div>
            </div>
        </div>
    );
}