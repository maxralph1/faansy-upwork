<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'superadmin1',
            'first_name' => 'SuperAdmin',
            'last_name' => 'User',
            'email' => 'superadmin@superadmin.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'super-admin')->first()->id,
        ]);

        User::create([
            'username' => 'admin1',
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'admin')->first()->id,
        ]);

        User::create([
            'username' => 'creator1',
            'first_name' => 'Creator',
            'last_name' => 'User',
            'email' => 'creator@creator.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'creator')->first()->id,
        ]);

        User::create([
            'username' => 'user1',
            'first_name' => 'Generic',
            'last_name' => 'User',
            'email' => 'user@user.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'generic-user')->first()->id,
        ]);
    }
}
