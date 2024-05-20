<?php

use App\Http\Controllers\EventTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\EventController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UserController::class)->group(function(){
    Route::post('register', 'register');
    Route::get('user/{user}', 'show');
    Route::get('user/{user}/address', 'show_address');
    Route::get('user/', 'index');

    //UsersController routing
    Route::post('users/{user}/events/{event}/book', 'bookEvent');
    Route::get('user/{user}/events', 'listEvents');
});

Route::controller(AddressController::class)->group(function() {
    Route::post('address', 'store');
    Route::get('address/{address}', 'show');
    Route::get('address/{address}/user', 'show_user');
    Route::get('address', 'index');
});

//EventsController routing
Route::controller(EventController::class)->group(function() {
    Route::post('event', 'store');
    Route::get('event', 'index');
    Route::get('event/{event}/users', 'listUsers');
    Route::get('event/{event}', 'show');
});

Route::controller(EventTypeController::class)->group(function() {
    Route::post('type', 'store');
    Route::get('type/{type}', 'listEvents');
    Route::get('type', 'index');
    Route::get('eventtype', 'show');
});
