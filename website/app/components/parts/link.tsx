const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '';

import { linkProps } from "../../types/filters";

export default function Link({ href, className, children }: linkProps) {
    const resolvedHref = href.startsWith('http') ? href : `${prefix}${href}`;
    return <a href={resolvedHref} className={className}>{children}</a>;
}
