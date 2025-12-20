<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\UserOtp;
use App\Models\UserSession;
use App\Services\OtpService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
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
            'message' => 'Compte créé. Vérifiez votre e-mail.',
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
            'remember' => 'sometimes|boolean',

        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember', false); // false par défaut

        if (!Auth::attempt($credentials, $remember)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $user = Auth::user();


        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Votre email n\'est pas vérifié. Veuillez vérifier votre boîte de réception ou demander un nouveau lien.'
            ], 403);
        }


        // Envoi OTP
        $otpService->send($user, $request->channel, 'login', $remember);

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

        $otpRecord = $otpService->verify(
            $user,
            $request->otp,
            $request->channel,
            $request->context,
        );

        if (!$otpRecord) {
            return response()->json(['message' => 'OTP invalide'], 401);
        }

        // Gestion Remember Me
        $remember = $otpRecord->remember ?? false;
        $expiration = $remember
        ? now()->addWeeks(2)
        : now()->addHours(2);

        // Supprimer anciens tokens
        $user->tokens()->delete();

        // Créer token avec expiration
        $token = $user->createToken('api-token', ['*'], $expiration)->plainTextToken;

        // Création session
        $geo = $this->getGeoInfo($request->ip());

        $session = UserSession::create([
            'user_id'      => $user->id,
            'ip_address'   => $request->ip(),
            'user_agent'   => $request->userAgent(),
            'country_name' => $geo['country_name'] ?? null,
            'country_code' => $geo['country_code'] ?? null,
            'region_name'  => $geo['region_name'] ?? null,
            'region_code'  => $geo['region_code'] ?? null,
            'city'         => $geo['city'] ?? null,
            'time_zone'    => $geo['time_zone'] ?? null,
            'login_at'     => now(),
        ]);


        return response()->json([
            'message' => 'Connexion réussie',
            'token'   => $token,
            'expires_at' => $expiration,
            'user'    => $user,
            'session_id' => $session->id,
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

    public function resendVerificationByEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email déjà vérifié'], 400);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'Lien de vérification renvoyé']);
    }


    // Déconnexion et informations personnelles
    public function logout(Request $request)
    {
        /** @var \Laravel\Sanctum\PersonalAccessToken $token */
        $token = $request->user()->currentAccessToken();

        if ($token) {
            $token->delete();
        }
        // Mettre à jour la session
        $session = UserSession::where('user_id', $request->user()->id)
            ->whereNull('logout_at')
            ->latest()
            ->first();
        if ($session) {
            $session->update(['logout_at' => now()]);
        }
        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $user->load('user_sessions');
        return response()->json($user);
    }

    protected function getGeoInfo($ip)
    {
        $response = Http::get("https://reallyfreegeoip.org/json/{$ip}");
        return $response->ok() ? $response->json() : [];
    }


}
