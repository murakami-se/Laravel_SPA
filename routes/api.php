<?php

use Illuminate\Http\Request;
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

// ソーシャルログイン
// ------------------------------
// Route::group(['middleware' => ['web']], function () {    // SESSION_DRIVERにfileを使用する場合
    Route::post('/login/{provider}/callback', [App\Http\Controllers\Api\Auht\OAuthController::class, 'handleProviderCallback'])
        ->where('provider', 'github')->name('oauth.callback');
    Route::get('/login/{provider}', [App\Http\Controllers\Api\Auht\OAuthController::class, 'getProviderOAuthURL'])
        ->where('provider', 'github')->name('oauth.request');
// });

// auth
// ------------------------------
Route::post('login', [App\Http\Controllers\Api\Auth\LoginController::class, 'login']);
Route::post('logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);
Route::post('register', [App\Http\Controllers\Api\Auth\RegisterController::class, 'register']);

// ログイン中のみ
// ------------------------------
Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('/user', fn (Request $request) => $request->user());
});
