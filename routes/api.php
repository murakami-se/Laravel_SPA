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

Route::post('login', [App\Http\Controllers\Api\Auth\LoginController::class, 'login']);
Route::post('logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);

// ログイン中のみ
Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('/user', fn (Request $request) => $request->user());
});
