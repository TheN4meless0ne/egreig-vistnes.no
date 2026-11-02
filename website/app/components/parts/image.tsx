const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '';

import { imageProps } from "../../lib/filters";

// Defaults to lazy loading: most of these images sit below the fold, and an
// eager load competes with the hero (LCP) for bandwidth. Pass loading="eager"
// for any image that is visible on first paint.
export default function Image({ src, alt, width, height, className, loading = "lazy" }: imageProps) {
  const resolvedSrc = src.startsWith('http://') || src.startsWith('https://') ? src : `${prefix}${src}`;
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding="async"
    />
  );
}