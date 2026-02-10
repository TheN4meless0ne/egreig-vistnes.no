import Urus from "./parts/icon/urus";
import Gebo from "./parts/icon/gebo";
import Ewas from "./parts/icon/ewas";

export default function Logo() {
    return (
        <div data-property-1="Default" className="w-24 inline-flex justify-start items-center gap-1.5">
            <Ewas />
            <Gebo />
            <Urus />
        </div>
    );
}