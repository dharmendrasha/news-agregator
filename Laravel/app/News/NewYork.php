<?php

namespace App\News;

class NewYork extends Base {
    public function api(){
        return http::ny();
    }
}
