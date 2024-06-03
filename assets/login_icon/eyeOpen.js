import * as React from "react";
const SvgComponent = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={size}
    height={size}
    fill={color}
    style={{
      enableBackground: "new 0 0 512.19 512.19",
    }}
    viewBox="0 0 512.19 512.19"
  >
    <circle cx={256.095} cy={256.095} r={85.333} />
    <path d="M496.543 201.034C463.455 147.146 388.191 56.735 256.095 56.735S48.735 147.146 15.647 201.034c-20.862 33.743-20.862 76.379 0 110.123 33.088 53.888 108.352 144.299 240.448 144.299s207.36-90.411 240.448-144.299c20.862-33.744 20.862-76.38 0-110.123zM256.095 384.095c-70.692 0-128-57.308-128-128s57.308-128 128-128 128 57.308 128 128c-.071 70.663-57.337 127.929-128 128z" />
  </svg>
);
export default SvgComponent;
