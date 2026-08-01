import Link from "./parts/link";
import Logo from "./logo";
import SearchBar from "./parts/searchbar";
import { NavbarButton } from "./parts/button";

export default function NavBar() {
    return (
        <nav className="flex w-full items-center gap-4 flex-wrap">
            <Link href="/"><Logo /></Link>
            <div className="order-3 w-full md:order-2 md:flex-1 flex justify-center items-start gap-2">
                <NavBarButtons />
            </div>
            <div className="order-2 ml-auto md:order-3 md:w-auto md:ml-0">
                <SearchBar />
            </div>
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