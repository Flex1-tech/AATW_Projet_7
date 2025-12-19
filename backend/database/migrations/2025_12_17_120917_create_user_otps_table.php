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
        Schema::create('user_otps', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('otp'); // OTP hashé
            $table->enum('channel', ['email', 'whatsapp']);
            $table->string('context')->nullable();

            $table->boolean('used')->default(false);

            $table->timestamp('expires_at');

            $table->timestamps();

            // Optimisation des requêtes
            $table->index(['user_id', 'used']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_otps');
    }
};
