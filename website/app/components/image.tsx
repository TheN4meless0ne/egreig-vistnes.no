import type { FilterDims } from "../types/filters";

export default function Image({ src, alt }: FilterDims) {
  return (
    <img
      src={src}
      alt={alt}
    />
  );
}