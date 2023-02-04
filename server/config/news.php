<?php

return [
    'newsapi' => [
        "key" => env('AGGR_NEWS_API_KEY', 'test'),
        "endpoint" => "https://newsapi.org/v2",
    ],
    "guardian" => [
        "key" => env("GUARDIAN_NEWS_API", 'test'),
        "endpoint" => "https://content.guardianapis.com",
    ],
    "ny" => [
        "key" => env('AGGR_APP_KEY', 'test'),
        "endpoint" => "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    ],
    'categories' => [
        "business", "entertainment", "general", "health", "science", "sports", "technology"
    ]
];
