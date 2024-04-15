<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('role_id')->constrained();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('username');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('require_two_factor_authentication')->default(false);
            $table->string('user_image_url')->nullable();
            $table->string('user_background_image_url')->nullable();
            $table->timestamp('last_seen')->nullable();
            $table->boolean('show_activity_status')->default(true);
            $table->boolean('users_must_be_subscribed_to_view_my_content')->default(false);
            $table->boolean('free_subscription')->default(true);
            $table->unsignedInteger('subscription_amount')->nullable();
            $table->boolean('show_subscription_offers')->default(true);
            $table->string('verification_material_image_url')->nullable();
            $table->boolean('verified')->default(false);
            $table->string('twitter_id')->nullable();
            $table->string('twitter_token')->nullable();
            $table->string('twitter_refresh_token')->nullable();
            $table->string('google_id')->nullable();
            $table->string('google_email')->nullable();
            $table->string('google_token')->nullable();
            $table->string('google_refresh_token')->nullable();
            $table->boolean('legal_age')->default(true);
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
