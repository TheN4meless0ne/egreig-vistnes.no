import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// POST /api/revalidate-sharepoint?library=Projects
// Drops the cached metadata for one SharePoint library so the next visit
// picks up changes straight away instead of waiting for the cache to expire.
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const library = request.nextUrl.searchParams.get("library") ?? "Projects";
  revalidateTag(`sharepoint-${library}`, { expire: 0 });
  return NextResponse.json({ revalidated: true, library, now: Date.now() });
}
