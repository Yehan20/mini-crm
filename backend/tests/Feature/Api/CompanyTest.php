<?php

namespace Tests\Feature\Api;

use App\Jobs\ProcessCompany;
use App\Mail\CompanyCreatedMail;
use App\Models\Company;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CompanyTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    private array $companyData;

    protected function setUp(): void
    {

        parent::setUp();

        $this->user = $this->createUser();
        $this->companyData = $this->createCompanyData();
    }

    public function test_returns_paginated_company_list(): void
    {

        Company::factory(10)->create();

        $response = $this->actingAs($this->user)->getJson('api/companies');

        $response->assertHeader('Content-type', 'application/json')
            ->assertStatus(200)
            ->assertJsonCount(10, 'data');
    }

    public function test_store_company(): void
    {

        // Act as user and run the route
        $response = $this->actingAs($this->user)->postJson('/api/companies', $this->companyData);

        // Check response and data
        $response->assertHeader('Content-type', 'application/json')
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'name' => $this->companyData['name'],
                    'website' => $this->companyData['website'],
                    'email' => $this->companyData['email'],

                ],
            ]);
    }


    public function test_store_company_and_notify(): void
    {

        // Create mock user
        $company = Company::factory()->create();

        // Fake mail
        Mail::fake();

        // Dispatch job immediatly
        ProcessCompany::dispatchSync($company);

        // Check mail sent
        Mail::assertSent(CompanyCreatedMail::class);

        // Check  "truth test".
        Mail::assertSent(function (CompanyCreatedMail $mail) use ($company) {

            return $mail->company->email === $company->email;
        });
    }

    public function test_update_company_successfull(): void
    {

        $company = Company::factory()->create();

        $newData = [
            'name' => 'My company 2',
            'email' => 'test22@test.com',
            'website' => 'my2fakecompany.com',

        ];

        $response = $this->actingAs($this->user)->putJson('/api/companies/' . $company->id, $newData);

        $response->assertHeader('Content-type', 'application/json')
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'name' => $newData['name'],
                    'email' => $newData['email'],
                    'website' => $newData['website'],

                ],
            ]);
    }

    public function test_delete_company_successfull(): void
    {

        $company = Company::factory()->create();

        $response = $this->actingAs($this->user)->deleteJson('/api/companies/' . $company->id);

        $response->assertStatus(204);

        $this->assertSoftDeleted('companies', ['id' => $company->id]);
    }

    public function test_store_company_validation_error(): void
    {

        $response = $this->actingAs($this->user)->postJson('/api/companies/', [
            'name' => '',
            'email' => '',
            'logo' => '',
            'website' => 'mysite',
        ]);

        $response->assertStatus(422);
        $response->assertInvalid(['email', 'name', 'logo']);
    }

    public function test_update_company_validation_error(): void
    {
        $company = Company::factory()->create();

        $response = $this->actingAs($this->user)->putJson('/api/companies/' . $company->id, [
            'name' => 'test name',
            'website' => 'test.com',
            'email' => '',

        ]);

        $response->assertStatus(422);
        $response->assertInvalid(['email']);
    }

    public function test_store_company_by_not_acting_as_user(): void
    {

        $response = $this->postJson('/api/companies', $this->companyData);

        $response->assertHeader('Content-type', 'application/json')
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

    private function createCompanyData(): array
    {
        // Fake the storage
        Storage::fake('logos');

        return [
            'name' => 'My company',
            'email' => 'test2@test.com',
            'website' => 'myfakecompany.com',
            'logo' => UploadedFile::fake()->image('test-image.jpg', 100, 100),

        ];
    }
} 
