import Link from "next/link";
import Logo from "./logo";
import SearchBar from "./parts/searchbar";
import NavButton from "./parts/button";

export default function NavBar() {
    return (
        <nav className="flex w-full items-center gap-4 flex-wrap">
            <Link href="/"><Logo /></Link>
            <div className="order-3 w-full md:order-2 md:flex-1 flex justify-center items-start gap-2">
                <NavBarButtons />
            </div>
            <div className="order-2 ml-auto w-full md:order-3 md:w-auto md:ml-0">
                <SearchBar />
            </div>
        </nav>
    );
}

function NavBarButtons() {
    return (
        <div className="flex flex-wrap items-center gap-6">
            <NavButton name="Home" destination="/" />
            <NavButton name="Portfolio" destination="/portfolio" />
            <NavButton name="Socials" destination="/socials" />
            <NavButton name="Resources" destination="/resources" />
            <NavButton name="Contact" destination="/contact" />
        </div>
    );
}