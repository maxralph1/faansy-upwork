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
        Schema::create('fundraisingdonations', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('fundraising_id')->constrained();
            $table->foreignUlid('user_id')->constrained();
            $table->unsignedInteger('amount_donated');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fundraisingdonations');
    }
};
