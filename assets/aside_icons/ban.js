import * as React from "react";
const SvgComponent = ({ color }) => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 34 33"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.4017 31.5C25.6859 31.5 32.4017 24.7843 32.4017 16.5C32.4017 8.21573 25.6859 1.5 17.4017 1.5C9.1174 1.5 2.40167 8.21573 2.40167 16.5C2.40167 24.7843 9.1174 31.5 17.4017 31.5Z"
      stroke={color}
      strokeWidth={3}
      strokeMiterlimit={10}
    />
    <path
      d="M28.3159 5.58569L6.48737 27.4143"
      stroke={color}
      strokeWidth={3}
      strokeMiterlimit={10}
    />
  </svg>
);
export default SvgComponent;
