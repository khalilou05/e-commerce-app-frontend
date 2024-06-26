import * as React from "react";
const SvgComponent = ({ color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    // fill="#F1F1F1"
    fill={color}
    viewBox="0 0 24 24"
  >
    <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0Zm0 2a9.949 9.949 0 0 1 6.324 2.262L4.262 18.324A9.992 9.992 0 0 1 12 2Zm0 20a9.949 9.949 0 0 1-6.324-2.262L19.738 5.676A9.992 9.992 0 0 1 12 22Z" />
  </svg>
);
export default SvgComponent;
