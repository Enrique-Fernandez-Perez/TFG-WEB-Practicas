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


Route::controller(\App\Http\Controllers\UsersController::class)->group(function () {
    Route::get('users', 'index');
    Route::get('users/register', 'usersRegister');
    Route::get('user/{id}', 'findById');
    Route::delete('user/{id}', 'delete');
    Route::patch('user/{id}', 'update');
});

Route::controller(\App\Http\Controllers\ActividadeController::class)->group(function () {
    Route::get('actividades', 'index');
    Route::get('actividades/mine', 'listMine');
    Route::get('actividades/{id}', 'show');
    Route::delete('actividades/{id}', 'delete');
    Route::put('actividades/{id}', 'update');
    Route::post('actividades', 'store');
    Route::post('actividades/inscribir/{id}', 'addInscription');
    Route::post('actividades/favorita/{id}', 'addFavorite');
    Route::post('actividad/addImage/{id}', 'addImage');
    Route::get('actividades/search/{search}', 'search');
    Route::get('actividades/inscrito', 'actividadesInscritas');
    Route::get('actividades/favoritas', 'actividadesFavoritas');
});

Route::controller(\App\Http\Controllers\AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');
});
