<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsRequest;
use App\Module\NewsApiModule;
use Illuminate\Support\Facades\Request;

class NewsController extends Controller
{

    private function getUserFeed(){
        try{

            $user = request()->user();

            if(!$user){
                throw new \Exception('No User Found.');
            }

            $feeds = $user->feed()->first();

            if(!$feeds){
                throw new \Exception('Profile is not updated.');
            }


            return array_filter([
                'sources' => $feeds->default_source,
                'author' => $feeds->default_author,
                'category' => $feeds->default_category
            ], fn($value) => !is_null($value) && !empty($value));

        }catch(\Exception $ex){

            return [];

        }

    }


    public function getTopHeadLines(NewsRequest $req){
        $data = $req->only(['q', 'date', 'category', 'sources', 'pageSize', 'page', 'personalize']);

        $feeds = [];

        if(isset($data['personalize'])){
            $feeds = $this->getUserFeed();
        }


        $data = array_merge($data, $feeds);
        $data['language'] = $req->getLocale();
        $top = new NewsApiModule();
        return response()->json($top->getTopHeadLines($data));
    }

    public function getNews(NewsRequest $req){
        $data = $req->all();
    }
}
