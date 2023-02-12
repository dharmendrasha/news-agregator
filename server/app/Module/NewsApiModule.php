<?php

namespace App\Module;


use App\Helper\Article;
use App\Helper\Source;
use Illuminate\Support\Facades\Http;
use App\Helper\News;
use Illuminate\Support\Facades\Log;

class NewsApiModule extends NewsModule
{
    public function __construct(
        string $key = null,
        string $endpoint = null
    ){
        $this->setKey($key ?? config('news.newsapi.key'));
        $this->setEndpoint($endpoint ?? config('news.newsapi.endpoint'));
    }

    private function __process(array $data){
        $article = [];
        foreach ($data['articles'] as $key => $art) {
            $src = $art['source'];
            $source = new Source($src['id'], $src['id']);
            $article[$key] = new Article(
                $source,
                $art['author'],
                $art['title'],
                $art['description'],
                $art['url'],
                $art['urlToImage'],
                $art['publishedAt'],
                $art['content']
            );
        }
        return new News($data['totalResults'], $article);
    }

    private function fetchNews(array $q = [], string $title){
        try {
            $topHeadLines = Http::withMiddleware($this->midddleware($title, $q))->baseUrl($this->endPoint);
            $details = $topHeadLines->get('')->throw();
            return $this->__process($details->json());
        } catch (\Exception$ex) {
            Log::error($ex->getMessage(), $ex->getTrace());
            return new News();
        }
    }

    public function getTopHeadLines(array $query = []){
        return $this->fetchNews($query, 'top-headlines');
    }

    public function getNews(array $query = []){
        return $this->fetchNews($query, 'everything');
    }

    public function getSources(){
        try{
            $getSources = Http::withMiddleware($this->midddleware('top-headlines/sources'))->baseUrl($this->endPoint);
            $sources = $getSources->get('')->throw();
            return $sources->json()['sources'];
        }catch(\Exception $ex){
            return [];
        }
    }

}
