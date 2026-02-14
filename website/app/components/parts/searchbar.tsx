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
            <div data-state="Idle" data-text="False" className="w-48 h-8 pl-2 pr-1 relative inline-flex justify-start items-center gap-1 border border-foreground rounded-3xl">
                <div data-context="Content Area" data-state="Idle" className="w-48 h-8 left-0 top-0 absolute rounded-md">
                    <div className="w-48 h-8 left-0 top-0 absolute bg-blend-multiply rounded-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08)]" />
                    <div className="w-48 h-8 left-0 top-0 absolute rounded-full" />
                </div>
                <div className="w-4 h-3.5 relative">
                    <SearchIcon />
                </div>
                <input
                    aria-label="Search"
                    className="flex-1 z-10 bg-transparent text-Labels---Vibrant-(Use-Plus-Lighter-|-Darker)-Primary text-sm leading-4 placeholder:text-Labels---Vibrant-(Use-Plus-Lighter-|-Darker)-Primary focus:outline-none"
                    placeholder={placeholder}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <div data-state="Idle" className="w-4 h-3.5 relative" />
            </div>
        </form>
    );
}