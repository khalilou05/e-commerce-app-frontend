import * as React from "react";
const SvgComponent = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
  >
    <path d="M12 10a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z" />
    <path d="m22.536 4.122-2.658-2.658A4.966 4.966 0 0 0 16.343 0H5a5.006 5.006 0 0 0-5 5v14a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5V7.657a4.966 4.966 0 0 0-1.464-3.535ZM17 2.08V3a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V2h9.343a2.953 2.953 0 0 1 .657.08ZM22 19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3v1a5.006 5.006 0 0 0 5 5h4a4.991 4.991 0 0 0 4.962-4.624l2.16 2.16A3.02 3.02 0 0 1 22 7.657Z" />
  </svg>
);
export default SvgComponent;
