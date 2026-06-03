<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a stable instructor account for sample courses.
        User::firstOrCreate(
            ['email' => 'instructor@learntech.com'],
            [
                'name' => 'Sample Instructor',
                'password' => bcrypt('password'),
                'role' => 'user',
                'email_verified_at' => now(),
            ]
        );

        // Create a few regular users.
        User::factory()
            ->count(5)
            ->create([
                'role' => 'user',
            ]);

        // Create a test user for login/demo.
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'role' => 'user',
                'email_verified_at' => now(),
            ]
        );
    }
}
