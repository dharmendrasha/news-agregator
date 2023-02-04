<?php

namespace App\Http\Controllers;

use App\Helper\ResponseBody;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;

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

            $user = User::where('email', $req->get('email'))->first();

            if(!$user){
                throw new \Exception('User did not found with this email address.');
            }

            $passwordConfirm = Hash::check($req->get('password'), $user->password);

            if(!$passwordConfirm){
                throw new \Exception('Invalid user password please check and try again. there is no reset ot for forgot password mechanism here. You are on your own.');
            }

            $jwt = $this->encodeJwt(['name' => $user->name, 'email' => $user->email]);

            return response()->json(new ResponseBody(['jwt' => $jwt], 'User logged in successfully'));


        }catch(\Exception $ex){
            return response()->json(new ResponseBody([], $ex->getMessage(), true));
        }
    }

    public function register(UserRequest $req){
        try{
            DB::beginTransaction();
            $u = $req->only(['name', 'email', 'password']);
            $user = new User($u);
            $user->password = Hash::make($user->password);
            $user = $user->save();
            $jwt = $this->encodeJwt($req->only(['name', 'email']));
            DB::commit();

            return response()->json(new ResponseBody(['jwt' => $jwt], 'User registered successfully'));

        }catch(\Exception $ex){
            DB::rollBack();
            return response()->json(new ResponseBody([], 'Failed to register the user. Please try again', true));
        }
    }
}
