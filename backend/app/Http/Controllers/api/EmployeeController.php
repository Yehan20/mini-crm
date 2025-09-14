<?php

declare(strict_types=1);

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResource
    {
        //
        if ($request->query('dropdown') === true) {
            return EmployeeResource::collection(Employee::query()->get(['first_name', 'last_name']));
        }

        return EmployeeResource::collection(Employee::with('company:id,name,website')->latest()->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request): JsonResource
    {
        //
        $attributes = $request->validated();

        return new EmployeeResource(Employee::query()->create($attributes));
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee): JsonResource
    {
        //
        return new EmployeeResource($employee->load('company'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeRequest $request, Employee $employee): JsonResource
    {
        //

        $employee->update($request->validated());

        return new EmployeeResource($employee);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee): Response
    {
        //

        $employee->delete();

        return response()->noContent();
    }
}
