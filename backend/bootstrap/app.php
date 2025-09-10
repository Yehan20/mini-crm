<?php

use App\Http\Middleware\LogRequestDetails;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
        $middleware->append([LogRequestDetails::class]);
        $middleware->statefulApi();
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        //Unauthorized exception
        $exceptions->render(function (AuthenticationException $e, Request $request) {

            if ($request->is('api/*')) {
                return response()->json([
                    'status' => 'error',
                    'message' => $e->getMessage(),
                ], 401);
            }
        });

        // Validated exception
        $exceptions->render(function (ValidationException  $e, Request $request) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'errors' => $e->errors()
            ]);
        });

        // fallback exception
        $exceptions->render(function (Exception $e, Request $request) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        });
    })->create();
