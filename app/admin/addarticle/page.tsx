"use client";

import ImageBG from "@/assets/icons/image";
import AddImageIcon from "@/assets/icons/addImage";
import style from "@/css/route/addArticle.module.css";
import { useRef, useState } from "react";
import { createArticle } from "@/api/ArticleApi";
import ErrorIcon from "@/assets/icons/error.js";
import DoneIcon from "@/assets/icons/done";

import ImageSlider from "@/components/ImageSlider";

export type articleData = {
  [key: string]: string | number | undefined | boolean;
  title: string;
  description: string;
  reference: string;
  price: number;
  quantity: number;
  free_shipping: boolean;
};

export default function AddArticle() {
  const [imageList, setimageList] = useState<File[]>([]);
  const [imageUrlList, setimageUrlList] = useState<string[]>([]);

  const [status, setstatus] = useState("idle");
  const articleData = useRef<articleData>({} as articleData);

  const data = new FormData();

  async function uploadData() {
    if (articleData.current) {
      for (const [key, value] of Object.entries(articleData.current)) {
        if (key && value) {
          data.append(key, value.toString());
        }
      }
    }
    for (let img of imageList) {
      data.append("images", img);
    }
    try {
      const response = await createArticle(data);
      if (response && response.status == 201) {
        setstatus("done");
      }
    } catch (err) {
      setstatus("error");
      console.log(err);
    }
  }

  function handleField(
    field: keyof articleData,
    value: string | number | boolean
  ) {
    articleData.current[field] = value;
  }
  function viewImage(images: File[]) {
    console.log("inside the viewfunc", images);

    const newUrl = images.map((img) => URL.createObjectURL(img));
    setimageUrlList(newUrl);
  }

  if (status === "done") {
    return (
      <section className={style.wraper}>
        <section className={style.card}>
          <section className={style.done}>
            <DoneIcon />
            <button
              onClick={() => {
                setimageUrlList([]);
                setstatus("idle");
              }}
            >
              رجوع
            </button>
          </section>
        </section>
      </section>
    );
  }
  if (status === "error") {
    return (
      <section className={style.wraper}>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          className={style.card}
        >
          <ErrorIcon size={100} />
          <p style={{ color: "#A91D3A" }}>خطأ في الخادم</p>
        </section>
      </section>
    );
  }

  return (
    <section className={style.wraper}>
      <section className={style.card}>
        <div className={style.right_sec}>
          <div className={style.input_group}>
            <input
              onChange={(e) => handleField("title", e.target.value)}
              autoComplete="off"
              required
              type="text"
              name="title"
              id="title"
            />
            <label htmlFor="title">عنوان المنتج</label>
            <div className={style.price_qty}>
              <input
                onChange={(e) => handleField("price", e.target.value)}
                autoComplete="off"
                required
                type="text"
                name="price"
                id="price"
              />
              <label htmlFor="price">السعر</label>

              <input
                onChange={(e) => handleField("quantity", e.target.value)}
                autoComplete="off"
                required
                type="text"
                name="quantity"
                id="quantity"
              />
              <label htmlFor="quantity">الكمية</label>
            </div>
            <div className={style.ref_shipping}>
              <input
                onChange={(e) => handleField("reference", e.target.value)}
                autoComplete="off"
                required
                type="text"
                name="ref"
                id="ref"
              />
              <label htmlFor="ref">رمز المنتج</label>
              <div className={style.shipping}>
                <input
                  onChange={(e) =>
                    handleField("free_shipping", e.target.checked)
                  }
                  autoComplete="off"
                  type="checkbox"
                  name="shipping"
                  id="shipping"
                />
                <label htmlFor="shipping">توصيل مجاني</label>
              </div>
            </div>

            <textarea
              onChange={(e) =>
                (articleData.current.description = e.target.value)
              }
              required
              autoComplete="off"
              id="desc"
            ></textarea>
            <label htmlFor="desc">وصف المنتج</label>

            <button onClick={uploadData}>إضافة</button>
          </div>
        </div>
        <div className={style.left_sec}>
          {imageUrlList.length ? (
            <ImageSlider
              imageUrlsList={imageUrlList}
              setImageUrlList={setimageUrlList}
              isAdmin={true}
            />
          ) : (
            <>
              <ImageBG size={"500px"} color={"white"} />
              <span>
                <label htmlFor="imageUpload">
                  <AddImageIcon size={"20px"} />
                  <p>أضف صور</p>
                </label>
              </span>
              <input
                onChange={(e) => {
                  if (e.target.files) {
                    const files: FileList | File = e.target.files;
                    const arr = Array.from(files);
                    setimageList(arr);
                    viewImage(arr);
                  }
                }}
                type="file"
                name="imageUpload"
                id="imageUpload"
                multiple
              />
            </>
          )}
        </div>
      </section>
    </section>
  );
}
