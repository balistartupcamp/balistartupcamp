<?php

namespace App\Http\Controllers;

use App\Models\ExportFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ExportDownloadController extends Controller
{
    public function download(Request $request, ExportFile $exportFile)
    {
        // Check if user owns this export
        if ($exportFile->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Check if file is ready
        if ($exportFile->status !== 'completed') {
            abort(404, 'File belum siap atau gagal diproses');
        }

        // Check if expired
        if ($exportFile->isExpired()) {
            abort(410, 'Link download sudah expired');
        }

        // Check if file exists
        if (!Storage::disk($exportFile->disk)->exists($exportFile->path)) {
            abort(404, 'File tidak ditemukan');
        }

        return Storage::disk($exportFile->disk)->download($exportFile->path, $exportFile->filename);
    }
}
