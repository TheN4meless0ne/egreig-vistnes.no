"use client";

import { useEffect, useRef, useState } from "react";
import Link from "./parts/link";
import Logo from "./logo";
import SearchBar from "./parts/searchbar";
import { NavbarButton } from "./parts/button";
import MenuIcon from "./parts/icon/menu";
import CloseIcon from "./parts/icon/close";
import SearchIcon from "./parts/icon/search";

const NAV_LINKS = [
    { name: "Home", destination: "/" },
    { name: "Portfolio", destination: "/portfolio" },
    { name: "Socials", destination: "/socials" },
    { name: "Resources", destination: "/resources" },
    { name: "Contact", destination: "/contact" },
];

type Panel = "menu" | "search" | null;

// Mirrors the hover/focus treatment on NavbarButton so the mobile controls
// feel identical to the desktop links. Tailwind gates `hover:` behind
// `@media (hover: hover)`, which is false on touch devices, so `active:`
// carries the feedback there instead.
const iconButtonClass =
    "md:hidden inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-foreground/10 active:bg-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40";

// Keeps the control highlighted for as long as its panel is open.
const iconButtonOpenClass = "bg-foreground/10";

function NavBarButtons() {
    return (
        <div className="inline-flex justify-center items-center gap-2">
            {NAV_LINKS.map((item) => (
                <NavbarButton key={item.destination} name={item.name} destination={item.destination} />
            ))}
        </div>
    );
}

export default function NavBar() {
    const [panel, setPanel] = useState<Panel>(null);
    const navRef = useRef<HTMLElement>(null);

    const toggle = (next: Exclude<Panel, null>) =>
        setPanel((current) => (current === next ? null : next));

    // Close on Escape or a click outside the navbar.
    useEffect(() => {
        if (!panel) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setPanel(null);
            }
        };

        const handlePointerDown = (event: MouseEvent) => {
            if (!navRef.current?.contains(event.target as Node)) {
                setPanel(null);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handlePointerDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handlePointerDown);
        };
    }, [panel]);

    // Drop any open mobile panel once we cross into the desktop layout.
    useEffect(() => {
        const query = window.matchMedia("(min-width: 768px)");

        const handleChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setPanel(null);
            }
        };

        query.addEventListener("change", handleChange);
        return () => {
            query.removeEventListener("change", handleChange);
        };
    }, []);

    return (
        <nav ref={navRef} className="relative w-full">
            <div className="flex w-full flex-wrap items-center gap-4">
                <button
                    type="button"
                    onClick={() => toggle("menu")}
                    aria-label={panel === "menu" ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={panel === "menu"}
                    aria-controls="mobile-nav-menu"
                    className={`order-1 -ml-2.5 ${iconButtonClass} ${panel === "menu" ? iconButtonOpenClass : ""}`}
                >
                    {panel === "menu" ? <CloseIcon /> : <MenuIcon />}
                </button>

                <div className="order-2 flex flex-1 justify-center md:flex-none md:justify-start">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => toggle("search")}
                    aria-label={panel === "search" ? "Close search" : "Open search"}
                    aria-expanded={panel === "search"}
                    aria-controls="mobile-search"
                    className={`order-3 -mr-2.5 ${iconButtonClass} ${panel === "search" ? iconButtonOpenClass : ""}`}
                >
                    {panel === "search" ? <CloseIcon /> : <SearchIcon size={24} />}
                </button>

                {/* Between md and lg there isn't room for logo + links + search on one
                    line, so the links drop to a full-width row of their own. */}
                <div className="hidden order-5 w-full md:flex md:justify-center md:items-center lg:order-3 lg:w-auto lg:flex-1">
                    <NavBarButtons />
                </div>

                <div className="hidden order-4 md:block md:ml-auto lg:ml-0">
                    <SearchBar />
                </div>
            </div>

            {panel === "search" && (
                <div id="mobile-search" className="md:hidden mt-3">
                    <SearchBar autoFocus />
                </div>
            )}

            {panel === "menu" && (
                <div
                    id="mobile-nav-menu"
                    className="md:hidden absolute left-0 right-0 top-full z-40 mt-4 overflow-hidden rounded-xl border border-foreground/20 bg-background shadow-lg"
                >
                    <ul className="p-2">
                        {NAV_LINKS.map((item) => (
                            <li key={item.destination}>
                                <Link
                                    href={item.destination}
                                    className="block rounded-lg px-3 py-2.5 text-base leading-5 transition-colors hover:bg-foreground/10 active:bg-foreground/20"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
