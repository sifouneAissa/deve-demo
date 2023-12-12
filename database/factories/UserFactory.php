<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'birth' => $this->getRandomBirth(),
            'is_admin' => false,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }

    function getRandomBirth() {
        $minAge = 15;
        $maxAge = 75;

        // Calculate the minimum and maximum birthdates based on given age range
        $minBirthDate = date('Y-m-d', strtotime("-$maxAge years"));
        $maxBirthDate = date('Y-m-d', strtotime("-$minAge years"));

        // Convert dates to timestamps for randomization
        $minTimestamp = strtotime($minBirthDate);
        $maxTimestamp = strtotime($maxBirthDate);

        // Generate a random timestamp between the calculated range
        $randomTimestamp = mt_rand($minTimestamp, $maxTimestamp);

        // Format the random timestamp as a date
        $randomDate = date('Y-m-d', $randomTimestamp);

        return $randomDate;
    }

    public function isAdmin($isAdmin)
    {
        return $this->state(function (array $attributes) use ($isAdmin) {
            return [
                'is_admin' => $isAdmin,
            ];
        });
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
