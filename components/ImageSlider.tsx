"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import style from "@/css/component/imageSlider.module.css";
export default function ImageSlider({
  imgUrl,
}: {
  imgUrl: string[] | undefined;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const btnSub = useRef<HTMLElement | null>(null);
  const imgBox = useRef<HTMLElement | null>(null);

  function goNext() {
    if (imgUrl) {
      setImgIndex((prv) => (prv === imgUrl.length - 1 ? 0 : prv + 1));
    }
  }
  function goBack() {
    if (imgUrl) {
      setImgIndex((prv) => (prv === 0 ? imgUrl.length - 1 : prv - 1));
    }
  }

  useEffect(() => {
    btnSub.current = document.getElementById("submit");
    imgBox.current = document.getElementById("imgbox");

    console.log(imgBox.current);
  }, []);

  return (
    <section className={style.img_wraper}>
      {imgUrl?.map((item, index) => {
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
              transition: "all 200ms",
              userSelect: "none",

              objectFit: "cover",
            }}
          />
        );
      })}

      <button
        style={{ position: "absolute", right: "0", top: "0" }}
        onClick={goNext}
      >
        ➜
      </button>
      <button
        style={{ position: "absolute", left: "0", top: "0" }}
        onClick={goBack}
      >
        ➜
      </button>
      <div className={style.indicator_section}>
        {imgUrl && imgUrl.length < 12 ? (
          imgUrl?.map((img, index) => (
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
            {imgIndex + 1}/{imgUrl?.length}
          </span>
        )}
      </div>
    </section>
  );
}
