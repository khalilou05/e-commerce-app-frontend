import * as React from "react";
const SvgComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={155} height={155} fill="none">
    <path
      fill="url(#a)"
      d="M53.6 133.752 5.103 85.253a6.397 6.397 0 0 1 0-9.048L18.08 63.227c2.5-2.5 6.549-2.5 9.048 0l48.5 48.499a6.397 6.397 0 0 1 0 9.048l-12.979 12.978a6.403 6.403 0 0 1-9.048 0Z"
    />
    <path
      fill="url(#b)"
      d="m40.623 111.726 87.249-87.249a6.396 6.396 0 0 1 9.048 0l12.978 12.978a6.397 6.397 0 0 1 0 9.048l-87.249 87.249a6.397 6.397 0 0 1-9.048 0l-12.978-12.978a6.402 6.402 0 0 1 0-9.048Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={68.591}
        x2={11.434}
        y1={126.716}
        y2={69.559}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.108} stopColor="#0D7044" />
        <stop offset={0.433} stopColor="#11945A" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={143.408}
        x2={47.114}
        y1={30.967}
        y2={127.265}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2AC782" />
        <stop offset={1} stopColor="#21B876" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgComponent;
