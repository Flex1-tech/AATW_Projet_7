<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserOtp extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'otp',
        'channel',
        'used',
        'remember',
        'expires_at',
        'context',
    ];

    protected $casts = [
        'used' => 'boolean',
        'remember' => 'boolean',
        'expires_at' => 'datetime',
    ];


        // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Methods
    public function isExpired(): bool
    {
        return Carbon::now()->greaterThan($this->expires_at);
    }

    public function markAsUsed(): void
    {
        $this->update(['used' => true]);
    }

    public function verify(string $otp): bool
    {
        return !$this->used
            && !$this->isExpired()
            && Hash::check($otp, $this->otp);
    }


        // Scopes

    public function scopeValid($query)
    {
        return $query
            ->where('used', false)
            ->where('expires_at', '>', now());
    }
}
