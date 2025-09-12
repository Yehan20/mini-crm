<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedUserController extends Controller
{
    //

    public function store(LoginRequest $request)
    {
        // dd("login");

        $credintials = $request->validated();

        if (Auth::attempt($credintials)) {

      

            request()->session()->regenerate();

            return response()->json([
                'user' => $request->user(),
            ]);
        }

        throw new AuthenticationException('Invalid user credentials');
    }

    public function show(Request $request)
    {

        return response()->json([
            'user' => $request->user(),
        ]);
    }

    public function destroy(Request $request)
    {

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
