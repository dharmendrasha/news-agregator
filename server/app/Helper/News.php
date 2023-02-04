<?php

namespace App\Helper;

class News{
    public $results = 0;

    public $total = 0;
    public $articles = [];

    public function toJson(){
        return json_encode($this);
    }

    public function __construct(int $totalResults = 0, array $article = []){
        $this->total = $totalResults;
        $this->articles = $article;
        $this->results = count($this->articles);
    }
}

