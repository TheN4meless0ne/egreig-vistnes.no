import { imageProps } from "../lib/filters";

export default function Image({ src, alt }: imageProps) {
  return (
    <img
      src={src}
      alt={alt}
    />
  );
}