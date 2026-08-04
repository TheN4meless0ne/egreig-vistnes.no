const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '';

import { imageProps } from "../../types/filters";

export default function Image({ src, alt }: imageProps) {
  const resolvedSrc = src.startsWith('http://') || src.startsWith('https://') ? src : `${prefix}${src}`;
  return (
    <img
      src={resolvedSrc}
      alt={alt}
    />
  );
}