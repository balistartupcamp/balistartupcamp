<?php

namespace App\Jobs;

use App\Models\Absensi;
use App\Models\ExportFile;
use App\Models\User;
use Filament\Notifications\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;

class ExportAbsensiToWordJob implements ShouldQueue
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
        public string $absensiId,
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
        $absensi = Absensi::with('attendances')->find($this->absensiId);

        if (!$exportFile || !$user || !$absensi) {
            return;
        }

        $exportFile->markAsProcessing();

        try {
            $records = $absensi->attendances;

            $phpWord = new PhpWord();
            $section = $phpWord->addSection(['orientation' => 'landscape']);

            // Add title
            $section->addText(
                'Rekap Absensi: ' . $absensi->title,
                ['bold' => true, 'size' => 16],
                ['alignment' => 'center']
            );
            $section->addTextBreak();

            // Table and Headers
            $table = $section->addTable(['borderSize' => 6, 'cellMargin' => 80]);

            $table->addRow();
            $table->addCell(500)->addText('No', ['bold' => true]);
            $table->addCell(1000)->addText('Status', ['bold' => true]);
            $table->addCell(2500)->addText('Nama Lengkap', ['bold' => true]);
            $table->addCell(1500)->addText('NIM', ['bold' => true]);
            $table->addCell(2000)->addText('Prodi', ['bold' => true]);
            $table->addCell(1500)->addText('Nomor Telepon', ['bold' => true]);
            $table->addCell(2000)->addText('Startup', ['bold' => true]);
            $table->addCell(2000)->addText('Foto Bukti', ['bold' => true]);
            $table->addCell(2000)->addText('Tanda Tangan', ['bold' => true]);

            // Loop through records and add rows
            $no = 1;
            foreach ($records as $record) {
                $table->addRow(1000);

                $table->addCell(500)->addText((string) $no++);
                $table->addCell(1000)->addText($record->status ?? '-');
                $table->addCell(2500)->addText($record->nama_lengkap);
                $table->addCell(1500)->addText($record->nim);
                $table->addCell(2000)->addText($record->program_studi);
                $table->addCell(1500)->addText($record->nomor_telepon);
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

            // Add summary
            $section->addTextBreak();
            $section->addText('Total Peserta: ' . $records->count(), ['size' => 11]);
            $section->addText('Hadir: ' . $records->where('status', 'Hadir')->count(), ['size' => 11]);
            $section->addText('Izin: ' . $records->where('status', 'Izin')->count(), ['size' => 11]);
            $section->addText('Sakit: ' . $records->where('status', 'Sakit')->count(), ['size' => 11]);

            // Save to R2 storage
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
                ->body('File export absensi "' . $absensi->title . '" sudah siap. Klik untuk download.')
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
            $this->fail($e);
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(?\Throwable $exception): void
    {
        \Illuminate\Support\Facades\Log::error('Export Absensi job failed', [
            'exception' => $exception?->getMessage(),
            'absensiId' => $this->absensiId,
            'userId' => $this->userId,
            'exportFileId' => $this->exportFileId,
        ]);
    }
}
