<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsRequest;
use App\Module\NewsApiModule;
use Illuminate\Support\Facades\Request;

class NewsController extends Controller
{

    public function getTopHeadLines(NewsRequest $req){
        $data = $req->all();
        $data['language'] = $req->getLocale();
        $top = new NewsApiModule();
        return response()->json($top->getTopHeadLines($data));
    }

    public function getNews(NewsRequest $req){
        $data = $req->all();
    }
}
