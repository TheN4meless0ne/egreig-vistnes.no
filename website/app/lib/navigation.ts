/**
 * The site's top-level pages. Used by the navbar and by search, so a new page
 * only has to be added here to show up in both.
 */
export type SitePage = {
    name: string;
    destination: string;
    description: string;
    /** Extra words people might search for that aren't in the name or description. */
    keywords?: string[];
    /** Set to false to keep the page out of the navbar. It stays in search and the sitemap. */
    inNav?: boolean;
};

/** TEMPORARY: Kept so any existing import of NavLink still complies. */
/** Remove before merge to main! */
export type NavLink = SitePage;

export const SITE_PAGES: SitePage[] = [
    {
        name: "Home",
        destination: "/",
        description: "Landing page with featured projects.",
        keywords: ["elias", "greig-vistnes", "about"],
        inNav: true,
    },
    {
        name: "Portfolio",
        destination: "/portfolio",
        description: "Projects and featured work.",
        keywords: ["projects", "work"],
        inNav: true,
    },
    {
        name: "Resources",
        destination: "/resources",
        description: "Useful files, references and learning resources.",
        keywords: ["links", "learning", "downloads"],
        inNav: true,
    },
    {
        name: "Documents",
        destination: "/docs",
        description: "Documentation, notes and project write-ups.",
        keywords: ["docs", "documentation", "notes", "guides"],
        inNav: true,
    },
    {
        name: "Contact",
        destination: "/contact",
        description: "Send me a message.",
        keywords: ["email", "message", "get in touch"],
        inNav: true,
    },
    {
        name: "Privacy Statement",
        destination: "/privacy",
        description: "How this site handels your personal data.",
        keywords: ["privacy", "gdpr", "personvern", "data", "cookies"],
        inNav: false,
    },
];

export const NAV_LINKS: SitePage[] = SITE_PAGES.filter((page) => page.inNav !== false);
