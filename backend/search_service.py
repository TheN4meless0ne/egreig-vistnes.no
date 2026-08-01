"""Search domain logic for the website API."""

from __future__ import annotations

from dataclasses import dataclass, asdict


@dataclass(frozen=True)
class SearchItem:
    title: str
    description: str
    href: str
    keywords: list[str]


SEARCH_INDEX: list[SearchItem] = [
    SearchItem(
        title="Home",
        description="Landing page with hero section and highlighted projects.",
        href="/",
        keywords=["home", "landing", "hero", "projects", "elias", "vistnes"],
    ),
    SearchItem(
        title="Portfolio",
        description="Project portfolio and featured work.",
        href="/portfolio",
        keywords=["portfolio", "projects", "work", "case studies"],
    ),
    SearchItem(
        title="Resources",
        description="Useful links, references, and learning resources.",
        href="/resources",
        keywords=["resources", "links", "learning", "references"],
    ),
    SearchItem(
        title="Socials",
        description="Social media links and profiles.",
        href="/socials",
        keywords=["social", "socials", "linkedin", "github", "instagram", "youtube"],
    ),
    SearchItem(
        title="Contact",
        description="Ways to get in touch.",
        href="/contact",
        keywords=["contact", "email", "message", "reach out"],
    ),
    SearchItem(
        title="Docs",
        description="Project documentation and notes.",
        href="/docs",
        keywords=["docs", "documentation", "notes", "guide"],
    ),
]


def search_items(query: str, limit: int = 6) -> list[dict[str, str | list[str]]]:
    """Return best matching search items based on title, description, and keywords."""
    normalized_query = (query or "").strip().lower()

    if not normalized_query:
        return [asdict(item) for item in SEARCH_INDEX[:limit]]

    matched = []
    for item in SEARCH_INDEX:
        haystack = f"{item.title} {item.description} {' '.join(item.keywords)}".lower()
        if normalized_query in haystack:
            matched.append(asdict(item))

    return matched[:limit]
