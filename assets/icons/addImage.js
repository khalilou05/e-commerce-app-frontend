import * as React from "react";
const SvgComponent = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="white"
  >
    <path d="M24 19a1 1 0 0 1-1 1h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 1 1 2 0v3h3a1 1 0 0 1 1 1ZM16 7a1.001 1.001 0 1 0-1-1c0 .552.449 1 1 1ZM4.808 9.151 0 13.959V5c0-2.757 2.243-5 5-5h12c2.757 0 5 2.243 5 5v7h-3a3.003 3.003 0 0 0-2.992 2.793l-5.642-5.642a3.933 3.933 0 0 0-5.558 0ZM13 6c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3Zm-1 13a3.004 3.004 0 0 1 2.44-2.947l-5.488-5.488a1.935 1.935 0 0 0-2.73 0L0 16.787V17c0 2.757 2.243 5 5 5h7v-3Z" />
  </svg>
);
export default SvgComponent;
