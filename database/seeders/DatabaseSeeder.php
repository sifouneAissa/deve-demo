<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
            // for admin
            \App\Models\User::factory(1)->isAdmin(true)->create();
            // for standard
            \App\Models\User::factory(1000)->isAdmin(false)->create();
    }
}
