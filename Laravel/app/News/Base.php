<?php

namespace App\News;

use Illuminate\Support\Facades\Http;


abstract class Base {
    abstract public function api(): Http;
}

