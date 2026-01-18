<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasUuids;
    protected $table = "attendance";
    protected $fillable = [
        'absensi_id',
        'nama_lengkap',
        'nim',
        'program_studi',
        'nama_startup',
        'nomor_telepon',
        'ttd',
        'bukti_foto',
        'status',
    ];

    public function absensi()
    {
        return $this->belongsTo(Absensi::class, 'absensi_id');
    }
}
