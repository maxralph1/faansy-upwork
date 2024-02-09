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
        Schema::create('transactions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('beneficiary_id')->references('id')->on('users')->nullable();
            $table->foreignUlid('transactor_id')->references('id')->on('users');
            $table->enum('transaction_type', ['pay_per_view', 'subscription', 'tip', 'stream_tips', 'commission', 'vat']);
            $table->unsignedInteger('amount');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
