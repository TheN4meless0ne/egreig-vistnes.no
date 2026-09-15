const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '';

import { imageProps } from "../../lib/filters";

export default function Image({ src, alt, width, height, className }: imageProps) {
  const resolvedSrc = src.startsWith('http://') || src.startsWith('https://') ? src : `${prefix}${src}`;
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}