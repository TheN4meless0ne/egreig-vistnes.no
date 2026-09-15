import { tagProps } from "../../lib/filters";

/** Small pill label, e.g. flagging a document as also featured on the homepage. */
export function Tag({ label }: tagProps) {
    return (
        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
            {label}
        </span>
    );
}
