const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '';

type ImageProps = {
    src: string;
    alt: string;
};

export default function Image({ src, alt }: ImageProps) {
  const resolvedSrc = src.startsWith('http://') || src.startsWith('https://') ? src : `${prefix}${src}`;
  return (
    <img
      src={resolvedSrc}
      alt={alt}
    />
  );
}