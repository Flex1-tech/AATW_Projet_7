<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\UserOtp;
use App\Services\OtpService;
use Illuminate\Http\Request;
use App\Models\PasswordResetToken;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;




class PasswordController extends Controller
{
    public function requestReset(Request $request, OtpService $otpService)
    {
        $request->validate([
            'email'   => 'required|email|exists:users,email',
            'channel' => 'required|in:email,whatsapp',
        ]);

        $user = User::whereEmail($request->email)->first();

        $otpService->send($user, $request->channel, 'reset_password');

        return response()->json([
            'message' => 'OTP envoyé pour réinitialisation'
        ]);
    }


    public function reset(Request $request)
    {
        $request->validate([
            'reset_token' => 'required|string',
            'password'    => 'required|min:8|confirmed',
        ]);

        $hashedToken = hash('sha256', $request->reset_token);

        $reset = PasswordResetToken::where('token', $hashedToken)
            ->valid()
            ->first();

        if (! $reset) {
            return response()->json([
                'message' => 'Token invalide ou expiré'
            ], 403);
        }

        $user = User::findOrFail($reset->user_id);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // nettoyage
        $reset->delete();
        UserOtp::where('user_id', $user->id)
            ->where('context', 'reset_password')
            ->delete();

        return response()->json([
            'message' => 'Mot de passe réinitialisé avec succès'
        ]);
    }

}
