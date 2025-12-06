type FilterDims = {
    src: string;
    alt: string;
};

export default function Image({ src, alt }: FilterDims) {
  return (
    <img
      src={src}
      alt={alt}
    />
  );
}