import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
    return (
        <div className="grid grid-cols-3 px-25 span-2 flex justify-end items-center pt-5">
            <div className="grid grid-row-2 ml-4 min-w-100 max-w-262 pb-15">
                <div>
                    <Logo />
                </div>
                <div className="grid grid-cols-5 gap-x-2">
                    <div>01</div>
                    <div>02</div>
                    <div>03</div>
                    <div>04</div>
                    <div>05</div>
                </div>
            </div>
            <div className="grid grid-row-2 ml-4 min-w-100 max-w-262 gap-y-4">
                <div>
                    <p className="font-bold">Explore</p>
                </div>
                <div className="grid grid-row-4 gap-y-2">
                    <div><Link href="/" className="hover:underline">Portfolio</Link></div>
                    <div><Link href="/" className="hover:underline">Socials</Link></div>
                    <div><Link href="/" className="hover:underline">Resources</Link></div>
                    <div><Link href="/" className="hover:underline">Contact</Link></div>
                </div>
            </div>
            <div className="grid grid-row-2 ml-4 min-w-100 max-w-262 gap-y-4">
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