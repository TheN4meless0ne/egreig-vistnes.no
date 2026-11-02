/**
 * The site's top-level pages. Used by the navbar and by search, so a new page
 * only has to be added here to show up in both.
 */
export type NavLink = {
    name: string;
    destination: string;
    /** Shown under the page title in search results. */
    description: string;
    /** Extra words people might search for that aren't in the name or description. */
    keywords?: string[];
};

export const NAV_LINKS: NavLink[] = [
    {
        name: "Home",
        destination: "/",
        description: "Landing page with featured projects.",
        keywords: ["elias", "greig-vistnes", "about"],
    },
    {
        name: "Portfolio",
        destination: "/portfolio",
        description: "Projects and featured work.",
        keywords: ["projects", "work"],
    },
    {
        name: "Resources",
        destination: "/resources",
        description: "Useful files, references and learning resources.",
        keywords: ["links", "learning", "downloads"],
    },
    {
        name: "Documents",
        destination: "/docs",
        description: "Documentation, notes and project write-ups.",
        keywords: ["docs", "documentation", "notes", "guides"],
    },
    {
        name: "Contact",
        destination: "/contact",
        description: "Send me a message.",
        keywords: ["email", "message", "get in touch"],
    },
];
