import Link from "next/link";
import Logo from "./logo";
import SearchBar from "./parts/searchbar";
import { NavbarButton } from "./parts/button";

export default function NavBar() {
    return (
        <nav className="flex w-full items-center gap-6 flex-wrap">
            <Link href="/"><Logo /></Link>
            <div className="flex-1 flex justify-center items-start gap-2 flex-wrap content-start">
                <NavBarButtons />
            </div>
            <SearchBar />
        </nav>
    );
}

function NavBarButtons() {
    return (
        <div className="self-stretch inline-flex justify-center items-start gap-2 flex-wrap content-start">
            <NavbarButton name="Home" destination="/" />
            <NavbarButton name="Portfolio" destination="/portfolio" />
            <NavbarButton name="Socials" destination="/socials" />
            <NavbarButton name="Resources" destination="/resources" />
            <NavbarButton name="Contact" destination="/contact" />
        </div>
    );
}