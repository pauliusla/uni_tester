<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);
Route::PUT('/users/set-admin/{user}', [UserController::class, 'setAdmin'])
    ->middleware('auth:sanctum');
Route::PUT('/users/update-password/{user}', [UserController::class, 'updateUserPassword'])
    ->middleware('auth:sanctum');

Route::resource('users', UserController::class)
    ->only(['index', "show", "destroy", "update"])
    ->middleware('auth:sanctum');
