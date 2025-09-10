<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class AuthenticatedUserController extends Controller
{
    //

    public function store(LoginRequest $request)
    {
        //dd("login");

        $credintials =  $request->validated();

        if (Auth::attempt($credintials)) {

            logger('success login');

            request()->session()->regenerate();

            return response()->json(['message' => ('Login success')]);
        }
        logger('fails');

        throw new AuthenticationException('Invalid user credintials');
    }


    public function show(Request $request)
    {

        return  $request->user();
    }

    public function destroy(Request $request)
    {

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
