<?php

namespace App\Http\Controllers\api;

use App\actions\CreateCompany;
use App\actions\UpdateCompany;
use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyDropwDownResource;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // dd($request->query('dropdown'));
        if ((bool) $request->query('dropdown')) {
            return CompanyDropwDownResource::collection(Company::query()->get(['id', 'name']));
        }

        return CompanyResource::collection(Company::withCount('employees')->latest()->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request, CreateCompany $action)
    {

        //
        $attributes = $request->validated();

        $company = $action->execute(attributes: $attributes, file: $request->file('logo'));

        return new CompanyResource($company);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
        return new CompanyResource($company->loadCount('employees')->load('employees'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, Company $company, UpdateCompany $action)
    {

        $company = $action->execute($company, $request->validated(), $request->file('logo'));

        return new CompanyResource($company);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {

        $company->delete();

        return response()->noContent();
    }
}
