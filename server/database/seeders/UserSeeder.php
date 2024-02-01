<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Profile;
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

        $creator2 = User::create([
            'username' => 'creator2',
            'first_name' => 'Second',
            'last_name' => 'Creator',
            'email' => 'creator2@creator2.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'creator')->first()->id,
        ]);
        $profile2 = Profile::create([
            'user_id' => $creator2->id
        ]);

        $creator3 = User::create([
            'username' => 'creator3',
            'first_name' => 'Third',
            'last_name' => 'Creator',
            'email' => 'creator3@creator3.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'creator')->first()->id,
        ]);
        $profile3 = Profile::create([
            'user_id' => $creator3->id
        ]);

        $creator4 =  User::create([
            'username' => 'creator4',
            'first_name' => 'Fourth',
            'last_name' => 'Creator',
            'email' => 'creator4@creator4.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'creator')->first()->id,
        ]);
        $profile4 = Profile::create([
            'user_id' => $creator4->id
        ]);

        $creator5 = User::create([
            'username' => 'creator5',
            'first_name' => 'Fifth',
            'last_name' => 'Creator',
            'email' => 'creator5@creator5.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'creator')->first()->id,
        ]);
        $profile5 = Profile::create([
            'user_id' => $creator5->id
        ]);

        $creator6 = User::create([
            'username' => 'creator6',
            'first_name' => 'Sixth',
            'last_name' => 'Creator',
            'email' => 'creator6@creator6.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'creator')->first()->id,
        ]);
        $profile6 = Profile::create([
            'user_id' => $creator6->id
        ]);

        $creator7 = User::create([
            'username' => 'creator7',
            'first_name' => 'Seventh',
            'last_name' => 'Creator',
            'email' => 'creator7@creator7.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'creator')->first()->id,
        ]);
        $profile7 = Profile::create([
            'user_id' => $creator7->id
        ]);

        $creator8 = User::create([
            'username' => 'creator8',
            'first_name' => 'Eighth',
            'last_name' => 'Creator',
            'email' => 'creator8@creator8.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'creator')->first()->id,
        ]);
        $profile8 = Profile::create([
            'user_id' => $creator8->id
        ]);

        $creator9 = User::create([
            'username' => 'creator9',
            'first_name' => 'Ninth',
            'last_name' => 'Creator',
            'email' => 'creator9@creator9.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'creator')->first()->id,
        ]);
        $profile9 = Profile::create([
            'user_id' => $creator9->id
        ]);

        $creator10 = User::create([
            'username' => 'creator10',
            'first_name' => 'Tenth',
            'last_name' => 'Creator',
            'email' => 'creator10@creator10.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'role_id' => Role::where('title', 'creator')->first()->id,
        ]);
        $profile10 = Profile::create([
            'user_id' => $creator10->id
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
