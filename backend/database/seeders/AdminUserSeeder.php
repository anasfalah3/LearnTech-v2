<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
      /**
       * Run the database seeds.
       */
      public function run(): void
      {
            // Check if admin already exists
            $adminExists = User::where('email', 'admin@learntech.com')->exists();

            if (!$adminExists) {
                  User::create([
                        'name' => 'Admin User',
                        'email' => 'admin@learntech.com',
                        'password' => bcrypt('password123'),
                        'role' => 'admin'
                  ]);

                  $this->command->info('Admin user created successfully!');
                  $this->command->info('Email: admin@learntech.com');
                  $this->command->info('Password: password123');
            } else {
                  $this->command->info('Admin user already exists!');
            }
      }
}
