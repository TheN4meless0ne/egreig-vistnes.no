import { NextRequest, NextResponse } from "next/server";
import { searchSite } from "../../lib/search";

const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 20;
const MAX_QUERY_LENGTH = 100;

// GET /api/search?q=...&limit=...
// Replaces the Flask /api/search, which matched against a hardcoded list.
// This route wins over the /api/* rewrite in next.config.ts, because rewrites
// returned as a plain array only apply when no app route matches.
export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const query = (params.get("q") ?? "").slice(0, MAX_QUERY_LENGTH);

    const requested = Number.parseInt(params.get("limit") ?? "", 10);
    const limit = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), MAX_LIMIT) : DEFAULT_LIMIT;

    try {
        const items = await searchSite(query, limit);
        return NextResponse.json({ items, query });
    } catch (error) {
        console.error("Search failed:", error);
        return NextResponse.json({ error: "Search is temporarily unavailable." }, { status: 500 });
    }
}
