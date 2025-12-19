<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\OtpService;
use App\Models\User;

class OtpController extends Controller
{
    public function resend(Request $request, OtpService $service)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'channel' => 'required|in:email,whatsapp',
            'context' => 'required|in:login,reset_password',
        ]);

        $user = User::findOrFail($request->user_id);

        $service->send($user, $request->channel, $request->context);

        return response()->json(['message' => 'OTP renvoyé']);
    }
}

