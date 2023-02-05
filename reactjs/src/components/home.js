import "../styles/home.css";

export default function Home() {
  return (
      <section class='light'>
        <div class='container py-2'>
          <div class='h1 text-center text-dark' id='pageHeaderTitle'>
            My Cards Light
          </div>

          <article class='postcard light blue'>
            <a class='postcard__img_link' href='#'>
              <img class='postcard__img' src='https://picsum.photos/1000/1000' alt='Image Title' />
            </a>
            <div class='postcard__text t-dark'>
              <h1 class='postcard__title blue'>
                <a href='#'>Podcast Title</a>
              </h1>
              <div class='postcard__subtitle small'>
                <time datetime='2020-05-25 12:00:00'>
                  Mon, May 25th 2020
                </time>
              </div>
              <div class='postcard__bar'></div>
              <div class='postcard__preview-txt'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae
                accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit
                corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!
              </div>
              <ul class='postcard__tagbox'>
                <li class='tag__item'>
                  <i class='fas fa-tag mr-2'></i>Podcast
                </li>
                <li class='tag__item'>
                  <i class='fas fa-clock mr-2'></i>55 mins.
                </li>
                <li class='tag__item play blue'>
                  <a href='#'>
                    <i class='fas fa-play mr-2'></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
          <article class='postcard light red'>
            <a class='postcard__img_link' href='#'>
              <img class='postcard__img' src='https://picsum.photos/501/500' alt='Image Title' />
            </a>
            <div class='postcard__text t-dark'>
              <h1 class='postcard__title red'>
                <a href='#'>Podcast Title</a>
              </h1>
              <div class='postcard__subtitle small'>
                <time datetime='2020-05-25 12:00:00'>
                  Mon, May 25th 2020
                </time>
              </div>
              <div class='postcard__bar'></div>
              <div class='postcard__preview-txt'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae
                accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit
                corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!
              </div>
              <ul class='postcard__tagbox'>
                <li class='tag__item'>
                  <i class='fas fa-tag mr-2'></i>Podcast
                </li>
                <li class='tag__item'>
                  <i class='fas fa-clock mr-2'></i>55 mins.
                </li>
                <li class='tag__item play red'>
                  <a href='#'>
                    <i class='fas fa-play mr-2'></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
          <article class='postcard light green'>
            <a class='postcard__img_link' href='#'>
              <img class='postcard__img' src='https://picsum.photos/500/501' alt='Image Title' />
            </a>
            <div class='postcard__text t-dark'>
              <h1 class='postcard__title green'>
                <a href='#'>Podcast Title</a>
              </h1>
              <div class='postcard__subtitle small'>
                <time datetime='2020-05-25 12:00:00'>
                  Mon, May 25th 2020
                </time>
              </div>
              <div class='postcard__bar'></div>
              <div class='postcard__preview-txt'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae
                accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit
                corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!
              </div>
              <ul class='postcard__tagbox'>
                <li class='tag__item'>
                  <i class='fas fa-tag mr-2'></i>Podcast
                </li>
                <li class='tag__item'>
                  <i class='fas fa-clock mr-2'></i>55 mins.
                </li>
                <li class='tag__item play green'>
                  <a href='#'>
                    <i class='fas fa-play mr-2'></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
          <article class='postcard light yellow'>
            <a class='postcard__img_link' href='#'>
              <img class='postcard__img' src='https://picsum.photos/501/501' alt='Image Title' />
            </a>
            <div class='postcard__text t-dark'>
              <h1 class='postcard__title yellow'>
                <a href='#'>Podcast Title</a>
              </h1>
              <div class='postcard__subtitle small'>
                <time datetime='2020-05-25 12:00:00'>
                  Mon, May 25th 2020
                </time>
              </div>
              <div class='postcard__bar'></div>
              <div class='postcard__preview-txt'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae
                accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit
                corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt
                neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!
              </div>
              <ul class='postcard__tagbox'>
                <li class='tag__item'>
                  <i class='fas fa-tag mr-2'></i>Podcast
                </li>
                <li class='tag__item'>
                  <i class='fas fa-clock mr-2'></i>55 mins.
                </li>
                <li class='tag__item play yellow'>
                  <a href='#'>
                    <i class='fas fa-play mr-2'></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
  );
}
