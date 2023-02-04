<?php

namespace App\Http\Controllers;

use App\Helper\ResponseBody;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile(Request $req){
        return response()->json(new ResponseBody($req->user(), 'User profile'));
    }
}
