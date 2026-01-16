<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Absensi extends Model
{
    use HasUuids;
    protected $table = "absensi";
    protected $fillable = [
        'title',
        'slug',
        'is_active'
    ];

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class, 'absensi_id');
    }
}
