import Link from "next/link";
import Logo from "./logo";
import SearchBar from "./parts/searchbar";
import NavButton from "./parts/button";

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
            <NavButton name="Home" destination="/" />
            <NavButton name="Portfolio" destination="/portfolio" />
            <NavButton name="Socials" destination="/socials" />
            <NavButton name="Resources" destination="/resources" />
            <NavButton name="Contact" destination="/contact" />
        </div>
    );
}