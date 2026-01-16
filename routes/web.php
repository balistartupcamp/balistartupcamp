<?php

use App\Livewire\PublicAbsensiForm;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get("/links", function() {
    return Inertia::render('links');
});

Route::get('/absen/{absensi:slug}', PublicAbsensiForm::class)
    ->middleware(['web'])
    ->name('public.absen');

Route::get('/status/success', function () {
    return view('absensi.success');
})->name('absensi.success');

Route::get('/absen/signature/{attendance}', function (App\Models\Attendance $attendance) {
    // This renders the base64 string as a raw image in the browser
    $data = explode(',', $attendance->ttd);
    $content = base64_decode($data[1]);

    return response($content)->header('Content-Type', 'image/png');
})->name('signature.view');
