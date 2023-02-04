<?php

namespace App\Module;

use Psr\Http\Message\RequestInterface;
use GuzzleHttp\Middleware;
use GuzzleHttp\Psr7\Uri;
use Illuminate\Support\Facades\Http;



abstract class NewsModule{
    protected $key;
    protected $endPoint;

    protected function setKey($key){
        $this->key = $key;
    }

    protected function setEndpoint($end){
        $this->endPoint = $end;
    }

    public function midddleware(string $path = '', array $q = [], string $key = ''){
        $q['apiKey'] = !empty($key) ? $key : $this->key;
        return Middleware::mapRequest(function (RequestInterface $request) use ($path, $q) {
            $uri = $request->getUri();
            $uriPath = $uri->getPath();
            $uri = new Uri("{$uri->getScheme()}://{$uri->getHost()}{$uriPath}{$path}?{$uri->getQuery()}");
            $uri = $uri->withQueryValues($uri, $q);
            $request = $request->withUri($uri);
            return $request;
        });
    }

    protected function api(){
        return Http::withMiddleware($this->midddleware())->baseUrl($this->endPoint);
    }

    public function getTopHeadLines(array $query){
        $topHeadLines = Http::withMiddleware($this->midddleware('top-headlines', $query))->baseUrl($this->endPoint);
        return $topHeadLines;
    }

}
