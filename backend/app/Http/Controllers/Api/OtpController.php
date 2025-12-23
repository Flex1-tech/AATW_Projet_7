<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Support\Str;
use App\Services\OtpService;
use Illuminate\Http\Request;
use App\Models\PasswordResetToken;
use App\Http\Controllers\Controller;

class OtpController extends Controller
{
    public function resend(Request $request, OtpService $service)
    {
        $request->validate([
            'email'   => 'required|email|exists:users,email',
            'channel' => 'required|in:email,whatsapp',
            'context' => 'required|in:login,reset_password',
        ]);

        $user = User::where('email', $request->email)->firstOrFail();

        $service->send($user, $request->channel, $request->context);

        return response()->json(['message' => 'OTP renvoyé']);
    }



    public function verifyReset(Request $request, OtpService $service)
    {
        $request->validate([
            'email'   => 'required|email|exists:users,email',
            'otp'     => 'required|digits:6',
            'channel' => 'required|in:email,whatsapp',
        ]);

        $user = User::where('email', $request->email)->firstOrFail();

        $record = $service->verify(
            $user,
            $request->otp,
            $request->channel,
            'reset_password'
        );

        if (! $record) {
            return response()->json([
                'message' => 'OTP invalide ou expiré'
            ], 403);
        }

        // Invalide anciens tokens
        PasswordResetToken::where('user_id', $user->id)->delete();

        $token = Str::random(64);

        PasswordResetToken::create([
            'user_id'    => $user->id,
            'token'      => hash('sha256', $token),
            'expires_at' => now()->addMinutes(15),
        ]);

        return response()->json([
            'reset_token' => $token
        ]);
    }

}

