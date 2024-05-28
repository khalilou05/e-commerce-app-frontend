import * as React from "react";
const SvgComponent = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="#A91D3A"
    viewBox="0 0 24 24"
  >
    <g data-name="01 align center">
      <path d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12Zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Z" />
      <path d="M11 5h2v10h-2zM11 17h2v2h-2z" />
    </g>
  </svg>
);
export default SvgComponent;
