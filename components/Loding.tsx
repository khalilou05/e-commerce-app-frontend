import style from "@/css/component/loiding.module.css";
type loadingProp = {
  size: string;
  border: string;
};
export default function Loding({ size, border }: loadingProp) {
  const borderSize = border || 8;
  return (
    <div
      style={{
        width: size,
        borderRadius: "50%",
        aspectRatio: 1,
        border: `${borderSize}px solid #686D76`,
      }}
      className={style.loading}
    ></div>
  );
}
