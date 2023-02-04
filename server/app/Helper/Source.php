<?php

namespace App\Helper;

class Source
{
    public $id;
    public $source;
    public function __construct(
        string $id = null,
        string $source = null
    ) {
        $this->id = $id;
        $this->source = $source;
    }
}
