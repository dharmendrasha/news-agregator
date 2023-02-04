<?php

namespace App\News;


class Guardian extends Base {
    public function api(){
        return http::guardian();
    }
}

