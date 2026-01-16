<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('attendance', function (Blueprint $table) {
            $table->uuid('absensi_id');


            $table->string('nama_lengkap');
            $table->string('nim');
            $table->string('program_studi');
            $table->string('nama_startup');
            $table->string('nomor_telepon');
            $table->string('ttd');
            $table->string('bukti_foto');
            $table->timestamps();


            $table->foreign('absensi_id')
                ->references('id')
                ->on('absensi')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};
