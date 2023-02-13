import "../styles/home.css";
import { useEffect, useState } from "react";
import { getNews } from "../utils/api-list";
import { useRef } from "react";
import { useNavigation, useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const ref = useRef(null)
  const [isEnd, setIsEnd] = useState(false)
  const [articles, setArticles] = useState([])
  const [totalNews, setTotalNews] = useState(0)
  const [results, setResults] = useState(0)
  const [searchFor, setSearchFor] = useState(searchParams.get('q'));

  const loadMore = () => {
    loadPage(page+1)
  }

  const loadPage = (p = 1) => {
    setLoading(true);
    setPage(p)
    const date = searchParams.get('date')
    const category = searchParams.get("category");
    const source = searchParams.get("source");
    const lang = searchParams.get("lang");
    const country = searchParams.get("country");
    const searchPa = {
      page: p,
      q: searchFor,
      date,
      category,
      source,
      lang,
      country,
    };

    console.log(searchFor)

    return getNews(searchPa).then((d) => {
      if (d.articles.length === 0) {
        setIsEnd(true);
      }

      const art = [...articles, ...d.articles];
      setArticles(art);
      setResults(art.length);
      setTotalNews(Number(d.total ?? 0) - articles.length);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadMore();
  }, [])
  
  return (
    <section className="light">
      <div className="container py-2" id="page_read_news" ref={ref}>
        <div className="h1 text-center text-dark" id="pageHeaderTitle">
          Search : {searchFor}
        </div>
        {Array.isArray(articles) &&
          articles.map((val, ind) => {
            return <ArticleComponent key={ind} {...val} />;
          })}

        {!isEnd && (
          <button
            type="button"
            disabled={isLoading}
            onClick={loadMore}
            className="btn btn-primary left"
          >
            Load More...
          </button>
        )}
        {isEnd && <p>You have reached to the end.</p>}
      </div>
    </section>
  );
}


export const ArticleComponent = ({author, content, description, image, publishedAt, source, title, url}) => {
  return (
    <>
      <article className="postcard light blue">
        <a className="postcard__img_link" target="_blank" href={url} rel="noreferrer">
          <img className="postcard__img" src={image} alt="Image Title" />
        </a>
        <div className="postcard__text t-dark">
          <h1 className="postcard__title blue">
            <a target="_blank" href={url} rel="noreferrer">
              {title}
            </a>
          </h1>
          <div className="postcard__subtitle small">
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toDateString()}
            </time>
          </div>
          <div className="postcard__bar"></div>
          <div className="postcard__preview-txt">{content}</div>
          {author && <>Author : {author}</>}
          <br/>
          {source && source.source && <>Source : {source.source}</>}
        </div>
      </article>
    </>
  );
}


