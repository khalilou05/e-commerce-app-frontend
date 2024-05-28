"use client";
import React, { useEffect } from "react";

import style from "@/css/route/blacklist.module.css";
function BlaclistPage() {
  useEffect(() => {});
  return (
    <section className={style.wraper}>
      <section className={style.main}>
        <input type="text" title="shearch" />
        <section className={style.ban_list}></section>
      </section>
    </section>
  );
}

export default BlaclistPage;
