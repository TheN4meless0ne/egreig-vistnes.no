import { cacheLife, cacheTag } from "next/cache";

const TRADEMARK_URL = "https://raw.githubusercontent.com/TheN4meless0ne/Trademark/main/trademark.txt";
const FALLBACK_TRADEMARK = "© Elias Greig-Vistnes";

export async function getTrademark(): Promise<string> {
  "use cache";
  cacheLife("max");
  cacheTag("trademark");

  try {
    const res = await fetch(TRADEMARK_URL);
    if (!res.ok) return FALLBACK_TRADEMARK;
    const text = await res.text();
    return text.trim() || FALLBACK_TRADEMARK;
  } catch {
    return FALLBACK_TRADEMARK;
  }
}
