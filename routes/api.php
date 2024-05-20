<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::get('actividades/mine', response()->json('lol',408));

Route::controller(\App\Http\Controllers\ActividadeController::class)->group(function () {
    Route::get('actividades', 'index');
//    Route::get('actividades/mine', response()->json('lol',408));
    Route::get('actividades/{id}', 'show');
    Route::delete('actividades/{id}', 'delete');
    Route::put('actividades/{id}', 'update');
    Route::post('actividades', 'store');
    Route::get('actividades/inscrito', 'actividadesInscritas');
});

Route::controller(\App\Http\Controllers\AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');
});
