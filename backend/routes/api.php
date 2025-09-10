<?php

use App\Http\Controllers\api\AuthenticatedUserController;
use App\Http\Middleware\EnsureUserIsGuest;
use Illuminate\Support\Facades\Route;


Route::middleware('throttle:api')->group(function () {


    Route::post('login', [AuthenticatedUserController::class, 'store'])->middleware([EnsureUserIsGuest::class]);

    Route::middleware(['auth:sanctum'])->group(function () {

        Route::get('ping', function () {
            return response()->json([
                'message' => 'pong'
            ]);
        });

        Route::post('logout', [AuthenticatedUserController::class, 'destroy']);
        Route::get('user', [AuthenticatedUserController::class, 'show']);
    });
});
