import "@/css/route/singArticle.css";
import { getArticleById } from "@/api/ArticleApi";
import { getAllWilaya } from "@/api/wilayaApi";
import ImageSlider from "@/components/ImageSlider";
import OrderArtComp from "@/components/orderArtComp";
import style from "@/css/route/orderTable.module.css";
import ErrorIcon from "@/assets/icons/error";

type id = {
  params: {
    id: string;
  };
};

async function SingleArticle({ params }: id) {
  const articleId = params.id;

  const article = await getArticleById(articleId);
  const wilaya = await getAllWilaya();

  if (article === null) {
    return (
      <section className={style.wraper}>
        <ErrorIcon size={100} />
        <p
          style={{
            fontSize: "30px",
            color: "#A91D3A",
          }}
        >
          غير موجود
        </p>
      </section>
    );
  }

  return (
    <section className="wraper">
      <section className="article_wraper">
        <section id="infobox" className="right_section">
          <OrderArtComp wilayas={wilaya} />
          <section className="article_info_section">
            <h1>{article?.title}</h1>
            <h3>{article?.title}</h3>

            <p>{article?.description}</p>
          </section>
        </section>
        <section id="imgbox" className="img_wraper">
          <ImageSlider imgUrl={article?.img_url} />
        </section>
      </section>
    </section>
  );
}

export default SingleArticle;
