import style from "@/css/component/loiding.module.css";
type loadingProp = {
  size: string;
};
export default function Loding({ size }: loadingProp) {
  return (
    <div
      style={{
        width: size,
      }}
      className={style.loading}
    ></div>
  );
}
