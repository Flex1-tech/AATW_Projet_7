<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class OtpService
{
    public function send(User $user, string $channel, string $context): void
    {
        $this->ensureCooldown($user, $channel, $context);

        UserOtp::where('user_id', $user->id)
            ->where('context', $context)
            ->valid()
            ->delete();


        $otp = random_int(100000, 999999);

        UserOtp::create([
            'user_id'    => $user->id,
            'otp'        => Hash::make($otp),
            'channel'    => $channel,
            'context'    => $context,
            'expires_at' => now()->addMinutes(10),
        ]);

        $this->dispatch($user, $otp, $channel);
    }

    public function verify(User $user, string $otp, string $channel, string $context): bool
    {
        $record = UserOtp::where('user_id', $user->id)
            ->where('channel', $channel)
            ->where('context', $context)
            ->valid()
            ->latest()
            ->first();


        if (!$record || !Hash::check($otp, $record->otp)) {
            return false;
        }

        $record->markAsUsed();
        return true;
    }

    protected function ensureCooldown(User $user, string $channel, string $context)
    {
        $lastOtp = UserOtp::where('user_id', $user->id)
            ->where('channel', $channel)
            ->where('context', $context)
            ->latest()
            ->first();


        if ($lastOtp && $lastOtp->created_at->diffInSeconds(now()) < 300) {
            abort(429, 'Attendez avant de demander un nouveau code');
        }
    }

    protected function dispatch(User $user, int $otp, string $channel): void
    {
        if ($channel === 'email') {
            Mail::raw("Votre code OTP est : $otp", function ($message) use ($user) {
                $message->to($user->email)->subject('Code OTP');
            });
        } else {
            $this->sendWhatsapp($user->telephone, $otp);
        }
    }

    protected function sendWhatsapp(string $phone, string $otp): bool
    {
        // Formatage du numéro  
        $phone = preg_replace('/\D/', '', $phone); 
        if (substr($phone, 0, 2) === '01') {
            $phone = '229' . substr($phone, 2); 
        }

        $url = "https://wawp.net/wp-json/awp/v1/send";

        $instanceId  = config('services.wawp.instance_id');
        $accessToken = config('services.wawp.access_token');

        $message = "Votre code OTP est : {$otp}\nValable 10 minutes.";

        $data = [
            "number"        => $phone,
            "type"          => "text",
            "message"       => $message,
            "instance_id"   => $instanceId,
            "access_token"  => $accessToken
        ];

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS     => json_encode($data),
            CURLOPT_TIMEOUT        => 10
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($response === false || $httpCode !== 200) {
            error_log('Erreur WhatsApp OTP : ' . $response);
            return false;
        }

        return true;
    }
}
