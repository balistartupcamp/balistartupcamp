<?php

namespace App\Jobs;

use App\Models\Attendance;
use App\Models\ExportFile;
use App\Models\User;
use Filament\Notifications\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;

class ExportAttendanceToWordJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The maximum number of seconds the job can run before timing out.
     */
    public int $timeout = 600; // 10 minutes

    /**
     * Create a new job instance.
     */
    public function __construct(
        public array $recordIds,
        public int $userId,
        public int $exportFileId
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $exportFile = ExportFile::find($this->exportFileId);
        $user = User::find($this->userId);

        if (!$exportFile || !$user) {
            return;
        }

        $exportFile->markAsProcessing();

        try {
            $records = Attendance::with('absensi')
                ->whereIn('id', $this->recordIds)
                ->get();

            $phpWord = new PhpWord();
            $section = $phpWord->addSection(['orientation' => 'landscape']);

            // Table and Headers
            $table = $section->addTable(['borderSize' => 6, 'cellMargin' => 80]);

            $table->addRow();
            $table->addCell(1000)->addText('Sesi', ['bold' => true]);
            $table->addCell(1000)->addText('Status', ['bold' => true]);
            $table->addCell(1500)->addText('Nama Lengkap', ['bold' => true]);
            $table->addCell(1500)->addText('NIM', ['bold' => true]);
            $table->addCell(2000)->addText('Prodi', ['bold' => true]);
            $table->addCell(1500)->addText('Nomor Telepon', ['bold' => true]);
            $table->addCell(1000)->addText('Pukul', ['bold' => true]);
            $table->addCell(2000)->addText('Startup', ['bold' => true]);
            $table->addCell(2000)->addText('Foto Bukti', ['bold' => true]);
            $table->addCell(2000)->addText('Tanda Tangan', ['bold' => true]);

            // Loop through records and add rows
            foreach ($records as $record) {
                $table->addRow(1000);

                $table->addCell(2000)->addText($record->absensi->title ?? 'N/A');
                $table->addCell(1000)->addText($record->status);
                $table->addCell(3000)->addText($record->nama_lengkap);
                $table->addCell(1500)->addText($record->nim);
                $table->addCell(2000)->addText($record->program_studi);
                $table->addCell(1500)->addText($record->nomor_telepon);
                $table->addCell(1000)->addText(Carbon::parse($record->created_at)->locale('id')->timezone('Asia/Makassar')->translatedFormat('d F Y, H:i'));
                $table->addCell(2000)->addText($record->nama_startup);

                $photoCell = $table->addCell(2000);
                if ($record->bukti_foto && Storage::disk('r2')->exists($record->bukti_foto)) {
                    try {
                        $fullPath = Storage::disk('r2')->get($record->bukti_foto);
                        $photoCell->addImage($fullPath, ['width' => 60, 'height' => 60]);
                    } catch (\Exception $e) {
                        $photoCell->addText('Error loading photo', ['size' => 8]);
                    }
                } else {
                    $photoCell->addText('No Photo', ['size' => 8]);
                }

                $sigCell = $table->addCell(2000);
                if ($record->ttd) {
                    try {
                        $signatureData = explode(',', $record->ttd);
                        if (isset($signatureData[1])) {
                            $decodedSignature = base64_decode($signatureData[1]);
                            $sigCell->addImage($decodedSignature, ['width' => 70, 'height' => 35]);
                        }
                    } catch (\Exception $e) {
                        $sigCell->addText('Error', ['size' => 8]);
                    }
                }
            }

            // Save to storage
            $objWriter = IOFactory::createWriter($phpWord, 'Word2007');
            $tempFile = tempnam(sys_get_temp_dir(), 'export');
            $objWriter->save($tempFile);

            // Move to R2 storage
            $storagePath = 'exports/' . $exportFile->filename;
            Storage::disk('r2')->put($storagePath, file_get_contents($tempFile));

            // Update export file record
            $exportFile->update(['path' => $storagePath]);
            $exportFile->markAsCompleted();

            // Clean up temp file
            unlink($tempFile);

            // Send notification to user
            Notification::make()
                ->title('Export Selesai')
                ->body('File export absensi Anda sudah siap. Klik untuk download.')
                ->success()
                ->actions([
                    \Filament\Actions\Action::make('download')
                        ->label('Download')
                        ->url(route('exports.download', $exportFile))
                        ->openUrlInNewTab(),
                ])
                ->sendToDatabase($user);
        } catch (\Exception $e) {
            $exportFile->markAsFailed($e->getMessage());

            Notification::make()
                ->title('Export Gagal')
                ->body('Terjadi kesalahan saat mengexport data: ' . $e->getMessage())
                ->danger()
                ->sendToDatabase($user);

            // Don't re-throw to prevent infinite retries
            // The job will be marked as failed in the database
            $this->fail($e);
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(?\Throwable $exception): void
    {
        // Clean up any temp files if needed
        // Log the failure for debugging
        \Illuminate\Support\Facades\Log::error('Export job failed', [
            'exception' => $exception?->getMessage(),
            'recordIds' => $this->recordIds,
            'userId' => $this->userId,
            'exportFileId' => $this->exportFileId,
        ]);
    }
}
