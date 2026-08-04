"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import SearchIcon from "./icon/search";

type SearchItem = {
    title: string;
    description: string;
    href: string;
    keywords: string[];
};

type SearchBarProps = {
    placeholder?: string;
    onSubmit?: (query: string) => void;
    autoFocus?: boolean;
};

export default function SearchBar({
    placeholder = "Search",
    onSubmit,
    autoFocus = false,
}: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<SearchItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [requestError, setRequestError] = useState<string | null>(null);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const controller = new AbortController();
        const normalizedQuery = query.trim();
        const timeoutId = window.setTimeout(async () => {
            setIsLoading(true);
            setRequestError(null);

            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(normalizedQuery)}&limit=6`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Search request failed (${response.status})`);
                }

                const payload = (await response.json()) as { items?: SearchItem[] };
                setResults(payload.items ?? []);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }
                setRequestError("Search is temporarily unavailable.");
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 180);

        return () => {
            window.clearTimeout(timeoutId);
            controller.abort();
        };
    }, [query, isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleResultSelect = (href: string) => {
        setQuery("");
        setIsOpen(false);
        router.push(href);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) {
            setIsOpen(true);
            return;
        }

        const exactMatch = results[0];

        if (exactMatch) {
            handleResultSelect(exactMatch.href);
            onSubmit?.(query.trim());
            return;
        }

        onSubmit?.(query.trim());
    };

    return (
        <div ref={wrapperRef} className="relative w-full sm:w-auto">
            <form onSubmit={handleSubmit} className="inline-flex w-full sm:w-auto">
                <div className="h-10 w-full sm:w-64 pl-3 pr-2 relative inline-flex justify-start items-center gap-2 border border-foreground/40 rounded-3xl bg-background">
                    <div className="w-4 h-4 shrink-0 relative">
                        <SearchIcon />
                    </div>
                    <input
                        aria-label="Search"
                        autoFocus={autoFocus}
                        className="flex-1 min-w-0 z-10 bg-transparent text-sm leading-4 focus:outline-none"
                        placeholder={placeholder}
                        value={query}
                        onFocus={() => setIsOpen(true)}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setIsOpen(true);
                        }}
                    />
                </div>
            </form>

            {isOpen && (
                <div className="absolute right-0 z-30 mt-2 w-full sm:w-[26rem] overflow-hidden rounded-xl border border-foreground/20 bg-background shadow-lg">
                    {isLoading ? (
                        <div className="px-4 py-3 text-sm opacity-80">Searching...</div>
                    ) : requestError ? (
                        <div className="px-4 py-3 text-sm text-red-400">{requestError}</div>
                    ) : results.length > 0 ? (
                        <ul className="max-h-80 overflow-y-auto p-2">
                            {results.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleResultSelect(item.href);
                                        }}
                                        className="block rounded-lg px-3 py-2 transition-colors hover:bg-foreground/10"
                                    >
                                        <div className="text-sm font-medium">{item.title}</div>
                                        <div className="text-xs opacity-80">{item.description}</div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-3 text-sm opacity-80">No results found.</div>
                    )}
                </div>
            )}
        </div>
    );
}