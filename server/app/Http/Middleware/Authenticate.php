<?php

namespace App\Http\Middleware;

use App\Helper\ResponseBody;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if($request->expectsJson()){
            throw new HttpResponseException(response()->json(new ResponseBody([], 'User is unauthenticated.', true), 401));
        }

        return route('login');

    }
}
