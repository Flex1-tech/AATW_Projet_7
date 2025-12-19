<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\UserOtp;
use App\Models\UserSession;
use App\Services\OtpService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    // Inscription
    public function register(Request $request)
    {
        $request->validate([
            'nom'       => 'required|string|max:255',
            'prenom'    => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email',
            'telephone' => 'required|string|max:20|unique:users,telephone',
            'password'  => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            'nom'       => $request->nom,
            'prenom'    => $request->prenom,
            'email'     => $request->email,
            'telephone' => $request->telephone,
            'password'  => Hash::make($request->password),
        ]);

        event(new Registered($user));

        return response()->json([
            'message' => 'Compte créé. Vérifie ton e-mail.',
            'user_id' => $user->id,
        ], 201);
    }

    // Connexion 
    public function login(Request $request, OtpService $otpService)
    {
        $request->validate([
            'email'   => 'required|email',
            'password'=> 'required|string',
            'channel' => 'required|in:email,whatsapp',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        // Envoi OTP 
        $otpService->send($user, $request->channel, 'login');

        return response()->json([
            'message' => 'OTP envoyé',
            'user_id' => $user->id,
        ]);
    }


    // Vérification de l'OTP 
    public function verifyOtp(Request $request, OtpService $otpService)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'otp'     => 'required|digits:6',
            'channel' => 'required|in:email,whatsapp',
            'context' => 'required|in:login,reset_password',

        ]);

        $user = User::findOrFail($request->user_id);

        if (!$otpService->verify($user, $request->otp, $request->channel,$request->context)) {
            return response()->json(['message' => 'OTP invalide'], 401);
        }

        // Création session + info géo
        $geo = $this->getGeoInfo($request->ip());

        $session = UserSession::create([
            'user_id'      => $user->id,
            'ip_address'   => $request->ip(),
            'user_agent'   => $request->userAgent(),
            'country_name' => $geo['country_name'] ?? null,
            'city'         => $geo['city'] ?? null,
            'time_zone'    => $geo['time_zone'] ?? null,
            'login_at'     => now(),
        ]);

        // Supprimer anciens tokens
        $user->tokens()->delete();

        // Créer token Sanctum
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token'   => $token,
            'user'    => $user,
            'session' => $session->id,
        ]);
    }


    // EMAIL VERIFICATION 
    public function verifyEmail(Request $request)
    {
        if (!$request->hasValidSignature()) {
            return response()->json(['message' => 'Lien invalide'], 400);
        }

        $user = User::findOrFail($request->id);

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email déjà vérifié']);
        }

        $user->markEmailAsVerified();

        return response()->json(['message' => 'Email vérifié avec succès']);
    }

    public function resendVerificationEmail(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email déjà vérifié']);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Lien renvoyé']);
    }

    // Déconnexion et informations personnelles   
    public function logout(Request $request)
    {
        /** @var \Laravel\Sanctum\PersonalAccessToken $token */
        $token = $request->user()->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $user->load('user_sessions');
        return response()->json($request->user());
    }

    protected function getGeoInfo($ip)
    {
        $response = Http::get("https://reallyfreegeoip.org/json/{$ip}");
        return $response->ok() ? $response->json() : [];
    }


}
