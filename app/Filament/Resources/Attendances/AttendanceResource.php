<?php

namespace App\Filament\Resources\Attendances;

use App\Filament\Exports\AttendanceExporter;
use App\Filament\Imports\AttendanceImporter;
use App\Filament\Resources\Attendances\Pages\ManageAttendances;
use App\Jobs\ExportAttendanceToWordJob;
use App\Models\Attendance;
use App\Models\ExportFile;
use BackedEnum;
use Dom\Text;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ExportAction;
use Filament\Actions\ImportAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Nette\Utils\ImageColor;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;
use UnitEnum;

class AttendanceResource extends Resource
{
    protected static ?string $model = Attendance::class;
    protected static string|UnitEnum|null $navigationGroup = 'Peserta';
    protected static ?string $pluralLabel = 'Attendance';


    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('absensi_id')
                    ->required(),
                TextInput::make('nama_lengkap')
                    ->required(),
                TextInput::make('nim')
                    ->required(),
                TextInput::make('program_studi')
                    ->required(),
                TextInput::make('nama_startup')
                    ->required(),
                TextInput::make('nomor_telepon')
                    ->tel()
                    ->required(),
                Select::make('status')
                    ->label('Status')
                    ->options([
                        'Hadir' => 'Hadir',
                        'Izin' => 'Izin',
                        'Sakit' => 'Sakit',
                    ])
                    ->native(false),
                Textarea::make('ttd')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('bukti_foto')
                    ->required(),
            ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('id')
                    ->label('ID'),
                TextEntry::make('absensi_id'),
                TextEntry::make('nama_lengkap'),
                TextEntry::make('nim'),
                TextEntry::make('program_studi'),
                TextEntry::make('nama_startup'),
                TextEntry::make('nomor_telepon'),
                TextEntry::make('created_at')
                    ->label("Pukul")
                    ->formatStateUsing(function ($state) {
                        return Carbon::parse($state)
                            ->locale('id')
                            ->timezone('Asia/Makassar')
                            ->translatedFormat('d F Y, H:i');
                    }),
                TextEntry::make('status'),
                ImageEntry::make('ttd')
                    ->columnSpanFull()
                    ->extraAttributes(['class' => 'w-full overflow-hidden flex justify-center items-center']),
                ImageEntry::make('bukti_foto')
                    ->label('Foto Bukti')
                    ->disk('r2') // Tells Filament to look in storage/app/public
                    ->visibility('public')
                    ->square(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('absensi.title')
                    ->label('Sesi')
                    ->searchable(),
                TextColumn::make('status')
                    ->searchable(),
                TextColumn::make('nama_lengkap')
                    ->searchable(),
                TextColumn::make('nim')
                    ->searchable(),
                TextColumn::make('program_studi')
                    ->searchable(),
                TextColumn::make('nama_startup')
                    ->searchable(),
                TextColumn::make('nomor_telepon')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->label('Pukul')
                    ->formatStateUsing(function ($state) {
                        return Carbon::parse($state)
                            ->locale('id')
                            ->timezone('Asia/Makassar')
                            ->translatedFormat('d F Y, H:i');
                    }),
                ImageColumn::make('ttd')
                    ->searchable(),
                ImageColumn::make('bukti_foto')
                    ->label('Foto Bukti')
                    ->disk('r2')
                    ->visibility('public'),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
                BulkAction::make('export_to_word')
                    ->label('Export ke Word (Horizontal)')
                    ->icon('heroicon-o-document-text')
                    ->requiresConfirmation()
                    ->modalHeading('Export ke Word')
                    ->modalDescription('Export akan diproses di background. Anda akan menerima notifikasi ketika file siap untuk di-download.')
                    ->action(function (\Illuminate\Database\Eloquent\Collection $records) {
                        $user = auth()->user();

                        $exportFile = ExportFile::create([
                            'user_id' => $user->id,
                            'filename' => 'Rekap-Absensi-' . now()->format('Y-m-d-His') . '.docx',
                            'disk' => 'r2',
                            'path' => '', // Will be updated by job
                            'status' => 'pending',
                        ]);

                        ExportAttendanceToWordJob::dispatch(
                            $records->pluck('id')->toArray(),
                            $user->id,
                            $exportFile->id
                        );

                        Notification::make()
                            ->title('Export Sedang Diproses')
                            ->body('Export absensi untuk ' . $records->count() . ' data sedang diproses. Anda akan menerima notifikasi ketika file siap.')
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

    public static function getPages(): array
    {
        return [
            'index' => ManageAttendances::route('/'),
        ];
    }
}
