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

Route::get('/absen/{absensi:slug}', PublicAbsensiForm::class)->name('public.absen');

Route::get('/status/success', function () {
    return view('absensi.success');
})->name('absensi.success');
