<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Http;

use GuzzleHttp\Middleware;

use Psr\Http\Message\RequestInterface;




class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // news api
        Http::macro('newsapi', function () {
            return Http::withHeaders([
                'X-Api-Key' => config('news.newsapi.key'),
            ])->baseUrl(config('news.newsapi.endpoint'));
        });

        # guardian
        Http::macro('guardian', function () {
            return Http::withMiddleware(
                Middleware::mapRequest(function (RequestInterface $request) {
                    $request = $request->withQueryParams(['api-key' => config('news.guardian.key')]);
                    return $request;
                })
            )->baseUrl(config('news.guardian.endpoint'));
        });

        #new york
        Http::macro('ny', function () {
            return Http::withMiddleware(
                Middleware::mapRequest(function (RequestInterface $request) {
                    $request = $request->withQueryParams(['api-key' => config('news.ny.key')]);
                    return $request;
                })
            )->baseUrl(config('news.ny.endpoint'));
        });




    }
}
