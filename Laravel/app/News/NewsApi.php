<?php

namespace App\News;

class NewApi extends Base {
    public function api(){
        return http::newsapi();
    }
}
