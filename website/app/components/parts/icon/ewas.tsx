import InnerShadowFilter from "../svgInnerShadowFilter";

export default function Ewas() {
    return (
        <svg width="22" height="35" viewBox="0 0 22 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
            <g filter="url(#filter_ewas)">
                <path
                    d="M0.314286 0C0.140711 0 0 0.142455 0 0.318182V34.6818C0 34.8575 0.140711 35 0.314286 35H2.82857C3.00215 35 3.14286 34.8575 3.14286 34.6818V4.49977L10.9983 12.4526L10.9995 12.4514L11.0012 12.4531L18.8571 4.49977V34.6818C18.8571 34.8575 18.9979 35 19.1714 35H21.6857C21.8593 35 22 34.8575 22 34.6818V0.318182C22 0.142455 21.8593 0 21.6857 0H18.8571L11 7.95455L3.14286 0H0.314286Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <InnerShadowFilter id="filter_ewas" width={32} height={45} />
            </defs>
        </svg>
    );
}