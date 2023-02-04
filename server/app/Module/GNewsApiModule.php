<?php

namespace App\Module;


use Illuminate\Support\Facades\Http;

class GNewsApiModule extends NewsModule
{
    public function __construct(
        string $key = null,
        string $endpoint = null
    ){
        $this->setKey($key ?? config('news.newsapi.key'));
        $this->setEndpoint($endpoint ?? config('news.newsapi.endpoint'));
    }

    public function getTopHeadLines(array $query = []){
        $topHeadLines = Http::withMiddleware($this->midddleware('top-headlines', $query))->baseUrl($this->endPoint);
        return $topHeadLines;
    }
}
