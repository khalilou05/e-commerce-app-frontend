import "@/css/route/singArticle.css";
import { getArticleById } from "@/api/ArticleApi";
import { getAllWilaya } from "@/api/wilayaApi";
// import ImageSlider from "@/components/ImageSlider";
import dynamic from "next/dynamic";

type id = {
  params: {
    id: string;
  };
};

async function SingleArticle({ params }: id) {
  const articleId = params.id;

  const ImageSlider2 = dynamic(() => import("@/components/ImageSlider"));

  const article = await getArticleById(articleId);
  const wilayas = await getAllWilaya();

  return (
    <section className="wraper">
      <section className="article_wraper">
        <section id="infobox" className="right_section">
          <section id="orderbox" className="order_wraper">
            <label htmlFor="fullname">الإسم و اللقب</label>
            <input type="text" id="fullname" />
            <label htmlFor="qty">الكمية</label>
            <input type="text" id="qty" />
            <label htmlFor="phoneNum">رقم الهاتف</label>
            <input type="text" id="phoneNum" />
            <label htmlFor="wilaya">الولاية</label>
            <select id="wilaya">
              <option>ـ ـ إختر ولاية ـ ـ</option>
              {wilayas?.map((itmwilaya) => (
                <option>
                  {itmwilaya.wilaya_code}&nbsp;&nbsp;{itmwilaya.wilaya}
                </option>
              ))}
            </select>

            <button id="submit">اطلب الآن</button>
          </section>
          <section className="article_info_section">
            <h1>{article?.title}</h1>
            <h3>{article?.title}</h3>
            <p>{article?.description}</p>
          </section>
        </section>
        <section id="imgbox" className="img_wraper">
          <ImageSlider2 title={article?.title} imgUrl={article?.img_url} />
        </section>
      </section>
    </section>
  );
}

export default SingleArticle;
