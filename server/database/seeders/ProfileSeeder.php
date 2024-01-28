<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Profile::create([
            'address' => fake()->address(),
            'bio' => fake()->text(100),
            'website_url' => fake()->url(),
            'twitter_account' => fake()->url(),
            'google_account' => fake()->url(),
            'language' => fake()->randomElement($array = array('en-US', 'fr', 'de')),
            'dark_mode' => fake()->boolean(),
            'user_id' => User::where('username', 'superadmin1')->first()->id,
        ]);

        Profile::create([
            'address' => fake()->address(),
            'bio' => fake()->text(100),
            'website_url' => fake()->url(),
            'twitter_account' => fake()->url(),
            'google_account' => fake()->url(),
            'language' => fake()->randomElement($array = array('en-US', 'fr', 'de')),
            'dark_mode' => fake()->boolean(),
            'user_id' => User::where('username', 'admin1')->first()->id,
        ]);

        Profile::create([
            'address' => fake()->address(),
            'bio' => fake()->text(100),
            'website_url' => fake()->url(),
            'twitter_account' => fake()->url(),
            'google_account' => fake()->url(),
            'language' => fake()->randomElement($array = array('en-US', 'fr', 'de')),
            'dark_mode' => fake()->boolean(),
            'user_id' => User::where('username', 'creator1')->first()->id,
        ]);

        Profile::create([
            'address' => fake()->address(),
            'bio' => fake()->text(100),
            'website_url' => fake()->url(),
            'twitter_account' => fake()->url(),
            'google_account' => fake()->url(),
            'language' => fake()->randomElement($array = array('en-US', 'fr', 'de')),
            'dark_mode' => fake()->boolean(),
            'user_id' => User::where('username', 'user1')->first()->id,
        ]);
    }
}
