export type imageProps = {
    src: string;
    alt: string;
}

export type navButtonProps = {
    name: string;
    destination: string;
};

export type iconButtonProps = {
    destination: string;
    icon: string;
};

export type iconSizeProp = {
    size?: number;
};

export type panelImageProps = {
    image: string;
    alt: string;
    heading: string;
    subheading: string;
    body1: string;
    body2: string;
};

export type cardProps = {
    title: string;
    body: string;
};

export type contactCardProps = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    link: string;
    label: string;
    value: string;
};

export type cardGrid2x2Props = {
    heading: string;
    subheading: string;
};
export type innerShadowFilterProps = {
    id: string;
    width: number;
    height: number;
};

export type searchItem = {
    title: string;
    description: string;
    href: string;
    keywords: string[];
};

export type searchBarProps = {
    placeholder?: string;
    onSubmit?: (query: string) => void;
    autoFocus?: boolean;
    /** Fired when a result is followed, so a containing panel can close itself. */
    onNavigate?: () => void;
};

export type linkProps = {
    href: string;
    className?: string;
    children: React.ReactNode;
    /** Set false on links that are unlikely to be followed, to skip prefetching. */
    prefetch?: boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};