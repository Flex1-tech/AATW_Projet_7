<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordResetToken extends Model
{
    protected $fillable = [
        'user_id',
        'token',
        'expires_at'
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public function scopeValid($q)
    {
        return $q->where('expires_at', '>', now());
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

