<?php

namespace App\Helper;

use App\Helper\Source;

class Article
{

    public $source;
    public $author;
    public $title;
    public $description;
    public $url;
    public $image;
    public $publishedAt;
    public $content;

    public function __construct(
        Source $source,
        string $author = null,
        string $title = null,
        string $description = null,
        string $url = null,
        string $image = null,
        string $publishedAt = null,
        string $content = null,
    ) {
        $this->source = $source;
        $this->author = $author;
        $this->title = $title;
        $this->description = $description;
        $this->url = $url;
        $this->image = $image;
        $this->publishedAt = $publishedAt;
        $this->content = $content;
    }

}

