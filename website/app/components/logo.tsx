import Urus from "./parts/icon/rune/urus";
import Gebo from "./parts/icon/rune/gebo";
import Ewas from "./parts/icon/rune/ewas";

export default function Logo() {
    return (
        <div data-property-1="Default" className="w-fit inline-flex justify-center items-center gap-1.5">
            <Ewas />
            <Gebo />
            <Urus />
        </div>
    );
}