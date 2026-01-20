<?php

namespace App\Filament\Resources\ExportFiles;

use App\Models\ExportFile;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use UnitEnum;

class ExportFileResource extends Resource
{
    protected static ?string $model = ExportFile::class;
    protected static string|UnitEnum|null $navigationGroup = 'Rekapan';
    protected static ?string $pluralLabel = 'Riwayat Export';
    protected static ?string $modelLabel = 'Export';
    protected static ?int $navigationSort = 100;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentArrowDown;

    public static function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn(Builder $query) => $query->where('user_id', auth()->id()))
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('filename')
                    ->label('Nama File')
                    ->searchable()
                    ->limit(40),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'pending' => 'gray',
                        'processing' => 'warning',
                        'completed' => 'success',
                        'failed' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
                TextColumn::make('expires_at')
                    ->label('Kadaluarsa')
                    ->dateTime('d M Y, H:i')
                    ->placeholder('Belum selesai')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'completed' => 'Completed',
                        'failed' => 'Failed',
                    ]),
            ])
            ->recordActions([
                Action::make('download')
                    ->label('Download')
                    ->icon(Heroicon::OutlinedArrowDownTray)
                    ->url(
                        fn(ExportFile $record): ?string =>
                        $record->status === 'completed' && !$record->isExpired()
                            ? route('exports.download', $record)
                            : null
                    )
                    ->openUrlInNewTab()
                    ->visible(
                        fn(ExportFile $record): bool =>
                        $record->status === 'completed' && !$record->isExpired()
                    ),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateHeading('Belum ada export')
            ->emptyStateDescription('Export file akan muncul di sini setelah Anda melakukan export data.')
            ->emptyStateIcon(Heroicon::OutlinedDocumentArrowDown);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageExportFiles::route('/'),
        ];
    }
}
