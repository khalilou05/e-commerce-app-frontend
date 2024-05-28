"use client";
import style from "@/css/route/manage_article.module.css";
import { useState } from "react";

function ArticleManager() {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);

  async function getAdminArticle() {
    try {
      setLoading(true);
      const req = await fetch("http://127.0.0.1:8000/login", {});
      if (req.status == 200) {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className={style.wraper}>
      <section className={style.main_section}>khalil</section>
    </section>
  );
}

export default ArticleManager;
