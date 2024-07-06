"use client";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "@/css/component/imageSlider.module.css";
import TrashIcon from "@/assets/icons/trash";

type propType = {
  imageUrlsList: string[] | undefined;
  setImageUrlList?: Dispatch<SetStateAction<string[]>>;
  isAdmin: boolean;
};

export default function ImageSlider({
  imageUrlsList,
  setImageUrlList,
  isAdmin,
}: propType) {
  const [imgIndex, setImgIndex] = useState(0);
  const btnSub = useRef<HTMLElement | null>(null);
  const imgBox = useRef<HTMLElement | null>(null);

  function goNext() {
    if (imageUrlsList) {
      setImgIndex((prv) => (prv === imageUrlsList.length - 1 ? 0 : prv + 1));
    }
  }
  function goBack() {
    if (imageUrlsList) {
      setImgIndex((prv) => (prv === 0 ? imageUrlsList.length - 1 : prv - 1));
    }
  }

  function handleImageDelete() {
    console.log(imgIndex);

    if (setImageUrlList) {
      const newImages = imageUrlsList?.filter(
        (item, index) => index !== imgIndex
      );
      if (newImages) {
        setImageUrlList(newImages);
        setImgIndex((prv) => (prv === 0 ? newImages.length - 1 : prv - 1));
      }
    }
  }

  useEffect(() => {
    btnSub.current = document.getElementById("submit");
    imgBox.current = document.getElementById("imgbox");
  }, []);

  return (
    <section className={style.img_wraper}>
      {imageUrlsList?.map((item, index) => {
        const url = !item.startsWith("blob")
          ? `http://localhost:8000/static/${item}`
          : item;
        return (
          <Image
            key={index}
            src={url}
            fill
            alt="img"
            style={{
              right: `${-100 * index}%`,
              translate: `${-100 * imgIndex}%`,
              transition: "all 300ms",
              userSelect: "none",
              objectFit: "cover",
            }}
          />
        );
      })}
      {imageUrlsList && imageUrlsList?.length > 1 ? (
        <>
          <button
            style={{ position: "absolute", right: "0", top: "0" }}
            onClick={goNext}
          >
            ➜
          </button>
          <button
            style={{
              position: "absolute",
              left: "0",
              top: "0",
              rotate: "180deg",
            }}
            onClick={goBack}
          >
            ➜
          </button>
        </>
      ) : null}
      {isAdmin ? (
        <>
          <button
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              left: "20px",
              bottom: "20px",
              backgroundColor: "#A91D3A",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
            }}
            onClick={handleImageDelete}
          >
            <TrashIcon />
          </button>
          <button
            onClick={() => (setImageUrlList ? setImageUrlList([]) : null)}
            style={{
              backgroundColor: "#A91D3A",
              width: "80px",
              height: "30px",
              fontSize: "small",
              position: "absolute",
              borderRadius: "5px",
              right: "20px",
              bottom: "20px",
            }}
          >
            <TrashIcon />
            &nbsp;&nbsp; إزالة الكل
          </button>
        </>
      ) : null}
      <div className={style.indicator_section}>
        {imageUrlsList && imageUrlsList.length < 12 ? (
          imageUrlsList?.map((img, index) => (
            <span
              onClick={() => setImgIndex(index)}
              key={index}
              className={style.ind_point}
              style={{
                width: "7px",
                height: "7px",
                scale: index === imgIndex ? "1.3" : "1",
                border: "1px solid white",
                backgroundColor: index === imgIndex ? "white" : "transparent",
                borderRadius: "50%",
              }}
            ></span>
          ))
        ) : (
          <span>
            {imgIndex + 1}/{imageUrlsList?.length}
          </span>
        )}
      </div>
    </section>
  );
}
