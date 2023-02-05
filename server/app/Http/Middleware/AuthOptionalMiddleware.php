<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class AuthOptionalMiddleware
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

            $authorization = $request->bearerToken();
            if (empty($authorization)) {
                throw new \Exception('authorization header is required.');
            }

            $authToken = PersonalAccessToken::findToken($authorization);

            $user = User::where('id', $authToken->tokenable_id)->first();

            if (!$user) {
                throw new \Exception('User did not found.');
            }

            $request->merge(['user' => $user]);

            $request->setUserResolver(function () use ($user) {
                return $user;
            });

        }catch(\Exception $ex){}


        return $next($request);
    }
}
