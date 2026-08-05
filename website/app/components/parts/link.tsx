import NextLink from "next/link";
import { linkProps } from "../../lib/filters";

// Empty unless running behind the `proxy` dev mode — see next.config.ts.
// `absproxy` uses basePath, which next/link applies on its own.
const routePrefix = process.env.NEXT_PUBLIC_ROUTE_PREFIX ?? '';

function isExternal(href: string) {
    return /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
}

export function resolveHref(href: string) {
    return isExternal(href) ? href : `${routePrefix}${href}`;
}

export default function Link({ href, className, children, prefetch, onClick }: linkProps) {
    if (isExternal(href)) {
        return <a href={href} className={className} onClick={onClick}>{children}</a>;
    }

    return (
        <NextLink href={resolveHref(href)} className={className} prefetch={prefetch} onClick={onClick}>
            {children}
        </NextLink>
    );
}
