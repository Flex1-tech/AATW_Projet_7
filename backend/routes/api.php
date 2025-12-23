<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OtpController;
use App\Http\Controllers\Api\PasswordController;
use App\Http\Controllers\Api\PasswordController as ApiPasswordController;

    // Routes d'AUTHENTIFICATION
    Route::prefix('auth')->group(function () {

        // Inscription & Connexion
        Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
        Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
        Route::post('/verify-otp', [AuthController::class, 'verifyOtp'])->name('auth.verify-otp');

        // Email Verification
        Route::prefix('email')->group(function () {
            // Vérification depuis le lien envoyé par email
            Route::get('/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
                ->middleware(['signed'])
                ->name('verification.verify');

            // Renvoi du lien de vérification
            Route::post('/resend', [AuthController::class, 'resendVerificationByEmail'])
                ->name('auth.email.resend');
        });

        // OTP
        Route::prefix('otp')->group(function () {
            Route::post('/resend', [OtpController::class, 'resend'])->name('auth.otp.resend');

            Route::post('/verify-reset', [OtpController::class, 'verifyReset'])
            ->name('auth.otp.verify-reset');
    });
        });

        // Password (Réinitialisation)
        Route::prefix('password')->group(function () {
            Route::post('/forgot', [PasswordController::class, 'requestReset'])->name('auth.password.forgot');
            Route::post('/reset', [PasswordController::class, 'reset'])->name('auth.password.reset');
        });

    // Routes protégées (auth:sanctum)
    Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::get('/me', [AuthController::class, 'me'])->name('auth.me');
    });


