<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedUserController extends Controller
{
    // Login
    public function store(LoginRequest $request): JsonResponse
    {

        $credentials = $request->validated();

        if (Auth::guard('web')->attempt($credentials)) {

            request()->session()->regenerate();

            return response()->json([
                'message' => 'login success',
            ]);
        }

        throw new AuthenticationException('Invalid user credentials');
    }

    // Gets authenticated user
    public function show(Request $request): JsonResponse
    {

        return response()->json([
            'user' => $request->user(),
        ]);
    }

    // Logouts the user
    public function destroy(Request $request): Response
    {

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
