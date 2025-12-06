import SearchIcon from "./icon/search";

export default function SearchBar() {
    return (
        <div data-state="Idle" data-text="False" className="w-48 h-8 pl-2 pr-1 relative inline-flex justify-start items-center gap-1">
            <div data-context="Content Area" data-state="Idle" className="w-48 h-8 left-0 top-0 absolute rounded-md">
                <div className="w-48 h-8 left-0 top-0 absolute bg-blend-multiply bg-white rounded-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08)]" />
                <div className="w-48 h-8 left-0 top-0 absolute bg-white rounded-full" />
            </div>
            <div className="w-4 h-3.5 relative">
                <SearchIcon />
            </div>
            <div className="flex-1 justify-start text-Labels---Vibrant-(Use-Plus-Lighter-|-Darker)-Primary text-sm leading-4 line-clamp-1 z-10">Search</div>
            <div data-state="Idle" className="w-4 h-3.5 relative" />
        </div>
    );
}