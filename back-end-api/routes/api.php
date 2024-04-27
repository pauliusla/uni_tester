<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);

Route::resource('users', UserController::class)
    ->only(['index', "show", "destroy", "update"])
    ->middleware('auth:sanctum');
