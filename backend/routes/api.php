<?php

use App\Http\Controllers\api\CompanyController;
use App\Http\Controllers\api\EmployeeController;
use App\Http\Controllers\AuthenticatedUserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['throttle:api', 'auth:sanctum'])->group(function () {

    Route::get('user', [AuthenticatedUserController::class, 'show']);

    Route::apiResource('companies', CompanyController::class);
    Route::apiResource('employees', EmployeeController::class);
});
