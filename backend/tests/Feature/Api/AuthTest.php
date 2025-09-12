<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {

        parent::setUp();

        $this->user = $this->createUser();
    }

    public function test_users_can_login_and_validate_session_and_logout(): void
    {

        $csrf = $this->get('/sanctum/csrf-cookie');

        // Step 2: Login with CSRF + cookies
        $response = $this->post('/login', [
            'email' => $this->user->email,
            'password' => 'password',
        ], [
            'X-XSRF-TOKEN' => $csrf->headers->getCookies()[0]->getValue(),
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            'user' => [
                'name' => $this->user->name,
                'email' => $this->user->email,
            ],
        ]);

        // Logout user 
        auth()->logout();

        $response = $this->getJson('api/user');
        $response->assertStatus(401);
    }

    public function test_users_cannot_login_with_invalid_credintials(): void
    {

        $csrf = $this->get('/sanctum/csrf-cookie');

        $response = $this->postJson('login', [
            'email' => 'wronguser@test.com',
            'password' => 'password',
        ], [
            'X-XSRF-TOKEN' => $csrf->headers->getCookies()[0]->getValue(),
        ]);

        $response->assertStatus(401);

        $response->assertJsonStructure([
            'status',
            'message',
        ]);
    }

    private function createUser(): User
    {
        // Default is password
        return User::factory()->create();
    }
}
