"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function ImageSlider({
  imgUrl,
  title,
}: {
  imgUrl: string[] | undefined;
  title: string | undefined;
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
    document.title = `${title}`;
    btnSub.current = document.getElementById("submit");
    imgBox.current = document.getElementById("imgbox");

    console.log(imgBox.current);
  }, []);

  return (
    <>
      {imgUrl?.map((item, index) => (
        <Image
          key={index}
          src={`http://localhost:8000/static/${item}`}
          width={600}
          height={400}
          alt="img"
          style={{
            width: "auto",
            height: "auto",
            translate: `${-100 * imgIndex}%`,
            transition: "all 200ms",
            flexShrink: "unset",
            userSelect: "none",
          }}
        />
      ))}

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
      <div className="indicator_section">
        {imgUrl && imgUrl.length < 12 ? (
          imgUrl?.map((img, index) => (
            <span
              onClick={() => setImgIndex(index)}
              key={index}
              className="ind_point"
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
    </>
  );
}
