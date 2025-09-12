<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companyIds = Company::limit(10)->pluck('id')->toArray();
        return [
            //
            'first_name' => fake()->unique()->firstName(),
            'last_name' => fake()->unique()->lastName(),
            'company_id' => fake()->randomElement($companyIds),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->tollFreePhoneNumber(),

        ];
    }
}
