import InnerShadowFilter from "../svgInnerShadowFilter";

export default function Urus() {
    return (
        <svg width="17" height="35" viewBox="0 0 17 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter_urus)">
                <path
                    d="M0.441294 0.0500262L16.8746 11.4105C16.953 11.4647 17 11.5555 17 11.6527V34.7083C17 34.8694 16.8731 35 16.7167 35H14.45C14.2935 35 14.1667 34.8694 14.1667 34.7083V13.3573L2.83333 5.52277V34.7083C2.83333 34.8694 2.70648 35 2.55 35H0.283333C0.126853 35 0 34.8694 0 34.7083V0.29216C0 0.0587608 0.253068 -0.0800957 0.441294 0.0500262Z"
                    fill="#2C2C2C"
                />
            </g>
            <defs>
                <InnerShadowFilter id="filter_urus" width={27} height={45} />
            </defs>
        </svg>
    );
}