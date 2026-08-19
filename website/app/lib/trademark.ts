const TRADEMARK_URL = "https://raw.githubusercontent.com/TheN4meless0ne/Trademark/main/trademark.txt";
const FALLBACK_TRADEMARK = "© Elias Greig-Vistnes";

export async function getTrademark(): Promise<string> {
  try {
    const res = await fetch(TRADEMARK_URL, {
      cache: "force-cache",
      next: { tags: ["trademark"] },
    });
    if (!res.ok) return FALLBACK_TRADEMARK;
    const text = await res.text();
    return text.trim() || FALLBACK_TRADEMARK;
  } catch {
    return FALLBACK_TRADEMARK;
  }
}
