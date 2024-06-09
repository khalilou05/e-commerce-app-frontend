import * as React from "react";
const SvgComponent = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="27px"
    height="27px"
    viewBox="0 0 24 24"
    // fill={color || "white"}
  >
    <g data-name="01 align center">
      <path d="M24 3H4.242L4.2 2.649A3 3 0 0 0 1.222 0H0v2h1.222a1 1 0 0 1 .993.883L3.8 16.351A3 3 0 0 0 6.778 19H20v-2H6.778a1 1 0 0 1-.993-.884L5.654 15h16.182Zm-3.836 10H5.419l-.941-8h17.129Z" />
      <circle cx={7} cy={22} r={2} />
      <circle cx={17} cy={22} r={2} />
    </g>
  </svg>
);
export default SvgComponent;
