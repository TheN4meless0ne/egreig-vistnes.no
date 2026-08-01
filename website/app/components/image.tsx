type imageProps = {
  src: string;
  alt: string;
};

export default function Image({ src, alt }: imageProps) {
  return (
    <img
      src={src}
      alt={alt}
    />
  );
}