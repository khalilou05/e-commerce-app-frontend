import { UIAllarticle, getAllArticle } from "@/api/ArticleApi";
import style from "@/css/route/manage_article.module.css";
import { SERVER_IP } from "../../../settings.js";
async function ArticleManager() {
  const article: UIAllarticle[] | undefined = await getAllArticle();

  if (article == null) return <section>no article</section>;
  return (
    <section className={style.wraper}>
      <section className={style.main_section}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>السعر</th>
              <th>المخزون</th>
              <th>التوصيل</th>
              <th>تاريخ الإضافة</th>
            </tr>
          </thead>
          {article.map((art) => (
            <tbody>
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
                <td>{art.price}</td>
                <td>{art.quantity}</td>
                <td>{art.free_shipping}</td>
                <td>{art.published}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
    </section>
  );
}

export default ArticleManager;
