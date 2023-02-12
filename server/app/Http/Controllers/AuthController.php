<?php

namespace App\Http\Controllers;

use App\Helper\ResponseBody;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Models\UserFeedModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    private function priv_key(){
        return file_get_contents(storage_path(config('jwt.keys.private')));
    }

    private function pub_key()
    {
        $key = file_get_contents(storage_path(config('jwt.keys.public')));
        return $key;
    }

    private function encodeJwt(array $payload){
        return JWT::encode($this->generatePayload($payload), $this->priv_key(), config('jwt.algo'));
    }

    public function decodeJwt(string $jwt)
    {
        return JWT::decode($jwt, new Key($this->pub_key(), config('jwt.algo')));
    }

    private function generatePayload(array $p){
        $payload = [
            'aud' => request()->getHost(),
        ];
        $merged = array_merge($payload, $p);
        return $merged;
    }

    public function login(UserLoginRequest $req){
        try{

            if (!Auth::attempt($req->only('email', 'password'))) {
                throw new \Exception('Login information is invalid.');
            }

            $user = User::where('email', $req->get('email'))->first();

            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json(new ResponseBody(['jwt' => $token], 'User logged in successfully'));

        }catch(\Exception $ex){
            return response()->json(new ResponseBody([], $ex->getMessage(), true));
        }
    }

    private function createUserFeed(User $user){
        try{
            DB::beginTransaction();
            $feed = new UserFeedModel();
            $feed->user_id = $user->id;
            $feed->save();
            DB::commit();
            return $feed;
        }catch(\Exception $ex){
            DB::rollBack();
            return null;
        }
    }

    public function register(UserRequest $req){
        try{

            DB::beginTransaction();
            $u = $req->only(['name', 'email', 'password']);
            $user = new User($u);
            $user->password = Hash::make($user->password);
            $user->save();
            DB::commit();

            // also create default feed
            $this->createUserFeed($user);


            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json(new ResponseBody(['jwt' => $token], 'User registered successfully'));

        }catch(\Exception $ex){
            DB::rollBack();
            return response()->json(new ResponseBody([], 'Failed to register the user. Please try again', true));
        }
    }
}
