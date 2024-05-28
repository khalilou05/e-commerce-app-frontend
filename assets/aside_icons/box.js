import * as React from "react";
const SvgComponent = ({ color }) => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4017 1.5L1.40167 10.0714L16.4017 18.6429L31.4017 10.0714L16.4017 1.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.40167 10.0714V22.9286L16.4017 31.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M31.4017 10.0714V22.9286L16.4017 31.5V18.6428"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.90167 14.3571L23.9017 5.78571"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.1517 19.7143L6.40167 17.5714"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgComponent;
