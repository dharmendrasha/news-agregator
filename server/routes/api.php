<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->middleware('sanctum-optional')->group(function () {

    Route::get('news', [NewsController::class, 'getNews']);

    Route::get('top_news', [NewsController::class, 'getTopHeadLines']);

    Route::get('available-news-options', [NewsController::class, 'getSources']);

    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
    });

    Route::prefix('user')->middleware('auth:sanctum')->group(function () {
        Route::get('/', [UserController::class, 'profile']);
        Route::post('/', [UserController::class, 'feed']);
    });

});
