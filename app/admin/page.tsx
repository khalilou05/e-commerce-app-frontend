"use client";
import React, { useEffect } from "react";
import style from "@/css/route/admin_home.module.css";
// import style from "@/css/route/"
function AdminHomePage() {
  useEffect(() => {
    (async () => {})();
  }, []);
  return (
    <section className={style.wraper}>
      <div className={style.info}>
        <span>مرحبا 👋</span>
      </div>
    </section>
  );
}

export default AdminHomePage;
