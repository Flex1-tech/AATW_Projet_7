<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\UserOtp;

class CleanExpiredOtps extends Command
{
    protected $signature = 'otp:clean-expired';
    protected $description = 'Supprime les OTP expirés';

    public function handle(): int
    {
        UserOtp::where('expires_at', '<', now())->delete();

        $this->info('OTP expirés supprimés.');
        return self::SUCCESS;
    }
}
