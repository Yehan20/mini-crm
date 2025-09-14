<?php

namespace Tests\Feature\Api;

use App\Models\Company;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    private array $employeeData;

    private Company $companyData;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = $this->createUser();
        $this->companyData = $this->createCompanyData();
        $this->employeeData = $this->createEmployeeData();
    }

    public function test_returns_paginated_employee_list(): void
    {
        Employee::factory(10)->create([
            'company_id' => $this->companyData->id,
        ]);

        $response = $this->actingAs($this->user)->getJson('api/employees');

        $response->assertHeader('Content-Type', 'application/json')
            ->assertStatus(200)
            ->assertJsonCount(10, 'data');
    }

    public function test_store_employee_successful(): void
    {
        $response = $this->actingAs($this->user)->postJson('/api/employees', $this->employeeData);

        $response->assertHeader('Content-Type', 'application/json')
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'first_name' => $this->employeeData['first_name'],
                    'last_name' => $this->employeeData['last_name'],
                    'company_id' => $this->employeeData['company_id'],
                    'email' => $this->employeeData['email'],
                    'phone' => $this->employeeData['phone'],
                ],
            ]);
    }

    public function test_update_employee_successful(): void
    {
        $employee = Employee::factory()->create([
            'company_id' => $this->companyData->id,
        ]);

        $newData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'company_id' => $employee->company_id,
            'email' => 'john.doe@test.com',
            'phone' => '1234567890',
        ];

        $response = $this->actingAs($this->user)->putJson('/api/employees/'.$employee->id, $newData);

        $response->assertHeader('Content-Type', 'application/json')
            ->assertStatus(200)
            ->assertJson([
                'data' => $newData,
            ]);
    }

    public function test_delete_employee_successful(): void
    {

        $employee = Employee::factory()->create([
            'company_id' => $this->companyData->id,
        ]);

        $response = $this->actingAs($this->user)->deleteJson('/api/employees/'.$employee->id);

        $response->assertStatus(204);

        $this->assertSoftDeleted('employees', ['id' => $employee->id]);
    }

    public function test_store_employee_validation_error(): void
    {
        $response = $this->actingAs($this->user)->postJson('/api/employees', [
            'first_name' => '',
            'last_name' => '',
            'company_id' => '',
            'email' => '',
            'phone' => '',
        ]);

        $response->assertStatus(422);
        $response->assertInvalid(['first_name', 'last_name', 'company_id']);
    }

    public function test_update_employee_validation_error(): void
    {

        $employee = Employee::factory()->create([
            'company_id' => $this->companyData->id,
        ]);

        $response = $this->actingAs($this->user)->putJson('/api/employees/'.$employee->id, [
            'first_name' => '',
            'last_name' => '',
            'company_id' => $this->companyData->id,
            'email' => 'fakeemail@test.com',
            'phone' => '0712222456',
        ]);

        $response->assertStatus(422);
        $response->assertInvalid(['first_name', 'last_name']);
    }

    public function test_store_employee_cannot_be_performed_by_unauthenticated_user(): void
    {
        $response = $this->postJson('/api/employees', $this->employeeData);

        $response->assertHeader('Content-Type', 'application/json')
            ->assertStatus(401)
            ->assertJson([
                'status' => 'error',
                'message' => 'Unauthenticated.',
            ]);
    }

    private function createUser(): User
    {
        return User::factory()->create();
    }

    private function createCompanyData(): Company
    {
        return Company::factory()->create();
    }

    private function createEmployeeData(): array
    {

        return [
            'first_name' => 'Alice',
            'last_name' => 'Smith',
            'company_id' => $this->companyData->id,
            'email' => 'alice.smith@test.com',
            'phone' => '1234567890',
        ];
    }
}
