<?php

namespace App\Http\Controllers;

use App\Helper\ResponseBody;
use App\Http\Requests\UserFeedRequest;
use App\Models\UserFeedModel;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile(Request $req){
        return response()->json(new ResponseBody($req->user(), 'User profile'));
    }

    public function feed(UserFeedRequest $req){
        $user = $req->user();
        $request = [];
        $request['user_id'] = $user->id;
        $request['default_source'] = $req->get('source');
        $request['default_category'] = $req->get('category');
        $request['default_author'] = $req->get('author');
        $feed = UserFeedModel::updateOrCreate(['user_id' => $user->id], $request);
        return response()->json(new ResponseBody($feed, 'User feed saved.'));
    }
}
