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

        $response = $this->postJson('login', [
            'email' => $this->user->email,
            'password' => 'password',
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

        $response = $this->postJson('/login', [
            'email' => 'wronguser@test.com',
            'password' => 'password',
        ]);

        $response->assertStatus(401);

        $response->assertJsonStructure([
            'status',
            'message',
        ]);
    }

    public function test_users_cannot_logout_without_login(): void
    {

        $this->postJson('logout')->assertStatus(401);
    }

    private function createUser(): User
    {
        // Default is password
        return User::factory()->create();
    }
}
