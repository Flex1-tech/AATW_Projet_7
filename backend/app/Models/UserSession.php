<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSession extends Model
{
    use HasFactory;

    protected $table = 'user_sessions';

    protected $fillable = [
        'user_id',
        'ip_address',
        'user_agent',
        'country_code',
        'country_name',
        'region_code',
        'region_name',
        'city',
        'time_zone',
        'login_at',
        'logout_at',
    ];


    protected $casts = [
        'login_at' => 'datetime',
        'logout_at' => 'datetime',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

     public function getLieu()
    {
        $parts = array_filter([
            $this->city,
            $this->region_name,
            $this->country_name
        ]);

        return $parts ? implode(', ', $parts) : null;
    }
}
