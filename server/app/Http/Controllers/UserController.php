<?php

namespace App\Http\Controllers;

use App\Helper\ResponseBody;
use App\Http\Requests\UserFeedRequest;
use App\Models\UserFeedModel;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile(Request $req){
        $user = $req->user();
        $feed = $user->feed()->first();
        $user->feed = $feed;
        // dd($feed);
        return response()->json(new ResponseBody($user, 'User profile'));
    }

    public function feed(UserFeedRequest $req){
        $user = $req->user();
        $request = [];
        $request['user_id'] = $user->id;
        $request['default_source'] = $req->get('source');
        $request['default_category'] = $req->get('category');
        $request['default_author'] = $req->get('author');
        $request['default_country'] = $req->get('country');
        $request['default_language'] = $req->get('language');
        $feed = UserFeedModel::updateOrCreate(['user_id' => $user->id], $request);
        return response()->json(new ResponseBody($feed, 'User feed saved.'));
    }
}
