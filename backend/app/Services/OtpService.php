<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class OtpService
{
    public function send(User $user, string $channel, string $context, bool $remember = false): void
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
            'remember'   => $remember,
            'expires_at' => now()->addMinutes(10),
        ]);

        $this->dispatch($user, $otp, $channel);
    }

    public function verify(User $user, string $otp, string $channel, string $context): ?UserOtp
    {
        $record = UserOtp::where('user_id', $user->id)
            ->where('channel', $channel)
            ->where('context', $context)
            ->valid()
            ->latest()
            ->first();


        if (!$record || !Hash::check($otp, $record->otp)) {
            return null;
        }

        $record->markAsUsed();
        return $record;
    }

    protected function ensureCooldown(User $user, string $channel, string $context)
    {
        $lastOtp = UserOtp::where('user_id', $user->id)
            ->where('channel', $channel)
            ->where('context', $context)
            ->latest()
            ->first();


        if ($lastOtp && $lastOtp->created_at->diffInSeconds(now()) < 60) {
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
    $phone = preg_replace('/\D/', '', $phone);
    if (substr($phone, 0, 2) === '01') {
        $phone = '229' . substr($phone, 2);
    }

    $message = "Votre code OTP est : {$otp}\nValable 10 minutes.";
    $client = new Client();

    try {
        $response = $client->post('https://wawp.net/wp-json/awp/v1/send', [
            'form_params' => [
                'instance_id'  => config('services.wawp.instance_id'),
                'access_token' => config('services.wawp.access_token'),
                'chatId'       => $phone,
                'message'      => $message,
            ],
            'timeout' => 10
        ]);

        $body = (string) $response->getBody();
        $data = json_decode($body, true);

        // Vérifier le statut si le JSON n'est pas vide
        if ($data && ($data['status'] ?? '') !== 'success') {
            error_log('Erreur WhatsApp OTP : ' . $body);
            return false;
        }

        return true;

    } catch (RequestException $e) {
        error_log('Erreur WhatsApp OTP : ' . $e->getMessage());
        return false;
    }
}
}
