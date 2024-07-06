"use client";
import { UIAllarticle, getAllArticle } from "@/api/ArticleApi";
import style from "@/css/route/manage_article.module.css";
import { SERVER_IP } from "../../../settings.js";
import { dateFormat } from "@/utils/dateFormat";
import EyeOpen from "@/assets/login_icon/eyeOpen";
import PenIcon from "@/assets/icons/pen";
import TrashIcon from "@/assets/icons/trash";
import GlobIcon from "@/assets/icons/globe";
import ErrorIcon from "@/assets/icons/error.js";

import { useEffect, useState } from "react";
import Loding from "@/components/Loding";

function ArticleManager() {
  const [article, setArticle] = useState<UIAllarticle[] | undefined>();
  const [status, setStatus] = useState("loading");
  const abortcntrl = new AbortController();
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllArticle();
        if (data) {
          setArticle(data);
          setStatus("done");
          return;
        }
        setStatus("error");
      } catch (err) {
        setStatus("error");
      }
    })();
  }, []);

  if (status === "loading")
    return (
      <section className={style.wraper}>
        <Loding size="100px" />
      </section>
    );
  if (status === "error")
    return (
      <section className={style.wraper}>
        <ErrorIcon size={100} />
        <p
          style={{
            color: "#A91D3A",
            fontWeight: "bold",
            position: "absolute",
            top: "60%",
          }}
        >
          الخادم لا يستجيب
        </p>
      </section>
    );
  return (
    <section className={style.wraper}>
      <section className={style.main_section}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>السعر</th>
              <th>المخزون</th>
              <th>نوع التوصيل</th>
              <th>عدد المشاهدات</th>
              <th>تاريخ الإضافة</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {article?.map((art) => (
              <tr>
                <td>
                  <img
                    width={100}
                    height={100}
                    src={`${SERVER_IP}/static/${art.img_url}`}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  {art.price}
                  &#160;&#160; دج
                </td>
                <td>{art.quantity}</td>
                <td>{art.free_shipping ? "مجاني" : "غير مجاني"}</td>
                <td>
                  {art.viewed_number}
                  &#160; &#160;
                  <EyeOpen size={"15px"} />
                </td>
                <td>{dateFormat(art.published)}</td>
                <td>
                  <button>
                    <PenIcon />
                  </button>
                  <button>
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default ArticleManager;
