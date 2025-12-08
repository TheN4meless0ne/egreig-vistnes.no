export type FilterDims = {
    // For all components
    id: string;
    width: number;
    height: number;

    // For bodies of text
    title: string;
    subtitle: string;
    heading: string;
    subheading: string;
    body: string;
    body1: string;
    body2: string;

    // For images
    src: string;
    alt: string;

    // For navigation links
    name: string;
    destination: string;
}