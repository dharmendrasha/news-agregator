import "../styles/home.css";
import { useEffect, useState } from "react";
import {getTopNewsApi} from '../utils/api-list'
import { useRef } from "react";





export default function Home() {

  const [isLoading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const ref = useRef(null)
  const [newsGet, newsSet] = useState({})
  const [totalNews, setTotalNews] = useState(0)
  const [results, setResults] = useState(0)

  
  const trackScrolling = () => {
    const e = document.getElementById("page_read_news");
    const bottom =
      e.scrollHeight - e.scrollTop === e.clientHeight;

    if (bottom) {
      console.log("header bottom reached");
      document.removeEventListener("scroll", trackScrolling);
    }
  };


  const loadPage = (page = 1) => {
    setLoading(true);
    return getTopNewsApi().then((d) => {
      newsSet(d);
      setResults(d.results ?? 0);
      setTotalNews(d.total ?? 0);
      setLoading(false);
    });
  }

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
    loadPage()

    return () => {
        document.removeEventListener("scroll", trackScrolling);
    }

  }, [])
  
  return (
    <section>
      <div className="container py-2" id="page_read_news" ref={ref}>
        <div className="h1 text-center text-dark" id="pageHeaderTitle">
          Top news list - {totalNews} - {results}
        </div>

        {!isLoading &&
          Array.isArray(newsGet.articles) &&
          newsGet.articles.map((val, ind) => {
            return <ArticleComponent key={ind} {...val} />;
          })}
      </div>
    </section>
  );
}


export const ArticleComponent = ({author, content, description, image, publishedAt, source, title, url}) => {
  return (
    <>
      <article className="postcard light blue">
        <a className="postcard__img_link" href="#">
          <img className="postcard__img" src={image} alt="Image Title" />
        </a>
        <div className="postcard__text t-dark">
          <h1 className="postcard__title blue">
            <a target="_blank" href={url}>
              {title}
            </a>
          </h1>
          <div className="postcard__subtitle small">
            <time dateTime="2020-05-25 12:00:00">
              {new Date(publishedAt).toDateString()}
            </time>
          </div>
          <div className="postcard__bar"></div>
          <div className="postcard__preview-txt">{content}</div>
          {author && (<>author : {author}</>)}
        </div>
      </article>
    </>
  );
}


