"use client";
import React, { useEffect, useRef } from "react";
import type { wilayaData } from "@/api/wilayaApi";

type orderTodb = {
  [key: string]: string | number | boolean | undefined;
  full_name: string;
  phone_number: string;
  wilaya: string;
  price: number;
  quantity: number;
  home_dilevery: boolean;
};

function OrderArtComp({ wilayas }: { wilayas: wilayaData[] | undefined }) {
  const orderData = useRef<orderTodb>();

  function handleCHange(field: keyof orderTodb, value: string | number) {
    if (orderData.current) {
      orderData.current[field] = value;
    }
  }

  useEffect(() => {
    const btn = document.getElementById("submit");
    const infobox = document.getElementById("infobox");
    const handlScroll = () => {
      infobox?.scroll(0, 0);
    };
    btn?.addEventListener("click", handlScroll);
    return () => {
      btn?.removeEventListener("click", handlScroll);
    };
  });
  return (
    <section id="orderbox" className="order_wraper">
      <label htmlFor="fullname">الإٍسم الكامل</label>
      <input
        onChange={(e) => handleCHange("fullname", e.target.value)}
        type="text"
        id="fullname"
      />
      <label htmlFor="qty">الكمية</label>
      <input
        onChange={(e) => handleCHange("quantity", Number(e.target.value))}
        type="text"
        id="qty"
      />
      <label htmlFor="phoneNum">رقم الهاتف</label>
      <input
        onChange={(e) => handleCHange("phone_number", e.target.value)}
        type="text"
        id="phoneNum"
      />
      <label htmlFor="wilaya">الولاية</label>
      <select
        onChange={(e) => handleCHange("wilaya", e.target.value)}
        id="wilaya"
      >
        <option>ـ ـ إختر ولاية ـ ـ</option>
        {wilayas?.map((itmwilaya) => (
          <option key={itmwilaya.id}>
            {itmwilaya.wilaya_code}&nbsp;&nbsp;{itmwilaya.wilaya}
          </option>
        ))}
      </select>
    </section>
  );
}

export default OrderArtComp;
