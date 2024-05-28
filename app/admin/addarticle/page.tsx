"use client";

import style from "@/css/route/addArticle.module.css";

export type articleData = {
  [key: string]: string | number;
  title: string;
  description: string;
  price: number;
  quantity: number;
};

export default function AddArticle() {
  return (
    <section className={style.wraper}>
      <div className={style.main_wraper}>
        <div className={style.info__wraper}>
          <label htmlFor="title"></label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="عنوان المنتج"
          />

          <div className={style.price_qty_wraper}>
            <label htmlFor="price"></label>
            <input
              placeholder="سعر المنتج"
              type="text"
              name="price"
              id="price"
            />
            <label htmlFor="quantity"></label>

            <input type="text" name="quantity" id="quantity" />
          </div>
          <textarea></textarea>
          <button>save</button>
        </div>
        <div className={style.image__wrpaer}>
          <label htmlFor="imageUpload">
            <div className={style.plus_icon}>+</div>
          </label>
          <input type="file" name="imageUpload" id="imageUpload" />
        </div>
      </div>
    </section>
  );
}
