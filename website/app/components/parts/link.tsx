const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '';

type LinkProps = {
    href: string;
    className?: string;
    children: React.ReactNode;
};

export default function Link({ href, className, children }: LinkProps) {
    const resolvedHref = href.startsWith('http') ? href : `${prefix}${href}`;
    return <a href={resolvedHref} className={className}>{children}</a>;
}
