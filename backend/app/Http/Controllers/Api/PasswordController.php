<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserOtp;
use App\Services\OtpService;
use Illuminate\Http\Request;
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
            'message' => 'OTP envoyé pour réinitialisation',
            'user_id' => $user->id
        ]);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'user_id'              => 'required|exists:users,id',
            'password'             => 'required|min:8|confirmed',
        ]);



        $validation = UserOtp::where('user_id', $request->user_id)
            ->where('context', 'reset_password')
            ->valid() 
            ->first();


        if (! $validation) {
            return response()->json([
                'message' => 'OTP non validé ou expiré'
            ], 403);
        }

        $user = User::findOrFail($request->user_id);
        $user->update([
            'password' => Hash::make($request->password)
        ]);

        // nettoyage
        $validation->delete();
        UserOtp::where('user_id', $user->id)->delete();

        return response()->json([
            'message' => 'Mot de passe réinitialisé avec succès'
        ]);
    }


}