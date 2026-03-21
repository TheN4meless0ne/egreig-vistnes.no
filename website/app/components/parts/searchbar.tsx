"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import SearchIcon from "./icon/search";

type SearchBarProps = {
    placeholder?: string;
    onSubmit?: (query: string) => void;
};

export default function SearchBar({
    placeholder = "Search",
    onSubmit,
}: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(query.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="inline-flex">
            <div className="w-48 h-8 pl-2 pr-1 relative inline-flex justify-start items-center gap-1 border border-foreground rounded-3xl">
                <div className="w-4 h-3.5 relative">
                    <SearchIcon />
                </div>
                <input
                    aria-label="Search"
                    className="flex-1 z-10 bg-transparent text-sm leading-4 focus:outline-none"
                    placeholder={placeholder}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
        </form>
    );
}