<?php

use App\Http\Controllers\AuthenticatedUserController;
use App\Http\Controllers\api\CompanyController;
use App\Http\Controllers\api\EmployeeController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:api')->group(function () {

    Route::middleware(['auth:sanctum'])->group(function () {

      
        Route::get('user', [AuthenticatedUserController::class, 'show']);

        Route::apiResource('companies', CompanyController::class);
        Route::apiResource('employees', EmployeeController::class);
    });
});
