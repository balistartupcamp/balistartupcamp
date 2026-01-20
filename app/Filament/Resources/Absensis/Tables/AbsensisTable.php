<?php

namespace App\Filament\Resources\Absensis\Tables;

use App\Jobs\ExportAbsensiToWordJob;
use App\Models\Absensi;
use App\Models\ExportFile;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class AbsensisTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('slug')
                    ->searchable()
                    ->description(fn($record) => url('/absen/' . $record->slug))
                    ->copyable(),
                TextColumn::make('attendances_count')
                    ->label('Peserta')
                    ->counts('attendances')
                    ->badge()
                    ->color('success'),
                IconColumn::make('is_active')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                Action::make('export_to_word')
                    ->label('Export Word')
                    ->icon(Heroicon::OutlinedDocumentArrowDown)
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Export ke Word')
                    ->modalDescription(
                        fn(Absensi $record) =>
                        'Export semua data attendance untuk "' . $record->title . '" ke Word. Proses ini akan berjalan di background.'
                    )
                    ->action(function (Absensi $record) {
                        $user = auth()->user();

                        if ($record->attendances()->count() === 0) {
                            Notification::make()
                                ->title('Tidak ada data')
                                ->body('Belum ada peserta yang hadir untuk sesi ini.')
                                ->warning()
                                ->send();
                            return;
                        }

                        $exportFile = ExportFile::create([
                            'user_id' => $user->id,
                            'filename' => 'Rekap-' . Str::slug($record->title) . '-' . now()->format('Y-m-d-His') . '.docx',
                            'disk' => 'r2',
                            'path' => '',
                            'status' => 'pending',
                        ]);

                        ExportAbsensiToWordJob::dispatch(
                            $record->id,
                            $user->id,
                            $exportFile->id
                        );

                        Notification::make()
                            ->title('Export Sedang Diproses')
                            ->body('Export absensi "' . $record->title . '" sedang diproses. Anda akan menerima notifikasi ketika file siap.')
                            ->info()
                            ->send();
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
