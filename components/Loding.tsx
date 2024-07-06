import style from "@/css/component/loiding.module.css";
type loadingProp = {
  size: string;
  borderWidth?: string;
  borderTopColor?: string;
  borderColor?: string;
};
export default function Loding({
  size,
  borderWidth,
  borderTopColor,
  borderColor,
}: loadingProp) {
  return (
    <div
      style={{
        width: size,
        borderRadius: "50%",
        aspectRatio: 1,
        borderLeft: `${borderWidth} solid ${borderColor}`,
        borderRight: `${borderWidth} solid ${borderColor}`,
        borderBottom: `${borderWidth} solid ${borderColor}`,
        borderTop: `${borderWidth} solid ${borderTopColor}`,
      }}
      className={style.loading}
    ></div>
  );
}
