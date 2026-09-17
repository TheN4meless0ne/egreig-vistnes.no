"use client";

import { useEffect } from "react";

const LIGHT_ICON = "https://egvsa001.egreig-vistnes.no/egvsacontainer1/egreig-vistnes/logo/egvlogo_black.svg";
const DARK_ICON = "https://egvsa001.egreig-vistnes.no/egvsacontainer1/egreig-vistnes/logo/egvlogo_white.svg";

// Browser support for `<link rel="icon" media="...">` is unreliable (e.g.
// Chrome can ignore it and just keep whichever icon link came last in the
// document), so the light/dark swap is driven here instead, against the
// single icon link the root layout's metadata renders.
export default function ThemeFavicon() {
    useEffect(() => {
        const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
        if (!link) return;

        const query = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = (isDark: boolean) => {
            link.href = isDark ? DARK_ICON : LIGHT_ICON;
        };

        applyTheme(query.matches);

        const handleChange = (event: MediaQueryListEvent) => applyTheme(event.matches);
        query.addEventListener("change", handleChange);
        return () => query.removeEventListener("change", handleChange);
    }, []);

    return null;
}
