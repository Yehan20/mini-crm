<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randBool = fake()->boolean();

        return [
            //
            'name' => fake()->unique()->company(),
            'email' => $randBool ? fake()->unique()->companyEmail() : null,
            'website' => $randBool ? 'https://www.'.fake()->domainName() : null,
            'logo' => $randBool ? 'https://placehold.co/100' : null,
        ];
    }
}
