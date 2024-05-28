import * as React from "react";
const SvgComponent = ({ color }) => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="Vector"
      d="M15.4017 0.5C7.1309 0.5 0.401672 7.22923 0.401672 15.5C0.401672 23.7708 7.1309 30.5 15.4017 30.5C23.6724 30.5 30.4017 23.7708 30.4017 15.5C30.4017 7.22923 23.6724 0.5 15.4017 0.5ZM15.4017 2.80769C22.4251 2.80769 28.094 8.47654 28.094 15.5C28.094 22.5235 22.4251 28.1923 15.4017 28.1923C8.37821 28.1923 2.70936 22.5235 2.70936 15.5C2.70936 8.47654 8.37821 2.80769 15.4017 2.80769ZM14.2478 8.57692V14.3462H8.4786V16.6538H14.2478V22.4231H16.5555V16.6538H22.3247V14.3462H16.5555V8.57692H14.2478Z"
      fill={color}
    />
  </svg>
);
export default SvgComponent;
