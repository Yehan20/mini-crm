<?php

use App\Http\Controllers\AuthenticatedUserController;
use App\Http\Middleware\EnsureUserIsGuest;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('login', [AuthenticatedUserController::class, 'store'])->middleware(EnsureUserIsGuest::class);
Route::post('logout', [AuthenticatedUserController::class, 'destroy'])->middleware('auth:sanctum');
