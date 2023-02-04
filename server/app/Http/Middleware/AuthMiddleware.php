<?php

namespace App\Http\Middleware;

use App\Helper\ResponseBody;
use App\Http\Controllers\AuthController;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try{
            $authorization = $request->header('authorization');

            if(empty($authorization)){
                throw new \Exception('authorization header is required.');
            }

            $token = preg_split('/\s+/', $authorization);

            if(count($token) !== 2){
                throw new \Exception('authorization token must be splitted by space Bearer .');
            }

            $key = $token[1];

            // confirm it

            $auth = new AuthController();
            $token = $auth->decodeJwt($key);

            $user = User::where('email', $token->email)->first();

            if(!$user){
                throw new \Exception('User did not found.');
            }

            $request->merge(['user' => $user]);

            $request->setUserResolver(function () use ($user) {
                return $user;
            });


            return $next($request);

        }catch(\Exception $ex){
            return response()->json(new ResponseBody([], $ex->getMessage(), true), 401);
        }


    }
}
