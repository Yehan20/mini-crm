<?php

declare(strict_types=1);

namespace App\Http\Controllers\api;

use App\Actions\CreateCompany;
use App\Actions\DeleteCompany;
use App\Actions\UpdateCompany;
use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyDropwDownResource;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResource
    {

        if ((bool) $request->query('dropdown')) {
            return CompanyDropwDownResource::collection(Company::query()->get(['id', 'name']));
        }

        return CompanyResource::collection(Company::withCount('employees')->latest()->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request, CreateCompany $action): JsonResource
    {

        //

        $attributes = $request->validated();

        $company = $action->execute(attributes: $attributes, file: $request->file('logo'), user: Auth::user());

        return new CompanyResource($company);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company): JsonResource
    {

        return new CompanyResource($company->loadCount('employees')->load('employees'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, Company $company, UpdateCompany $action): JsonResource
    {

        $company = $action->execute($company, $request->validated(), $request->file('logo'));

        return new CompanyResource($company);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company, DeleteCompany $action): Response
    {

        $action->execute($company);

        return response()->noContent();
    }
}
