<?php

namespace App\Filament\Resources\Attendances;

use App\Filament\Exports\AttendanceExporter;
use App\Filament\Imports\AttendanceImporter;
use App\Filament\Resources\Attendances\Pages\ManageAttendances;
use App\Models\Attendance;
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
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
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
                ImageEntry::make('ttd')
                    ->columnSpanFull(),
                ImageEntry::make('bukti_foto')
                    ->label('Foto Bukti')
                    ->disk('public') // Tells Filament to look in storage/app/public
                    ->visibility('public')
                    ->square(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('absensi.title')
                ->label('Sesi')
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
                ImageColumn::make('ttd')
                    ->searchable(),
                ImageColumn::make('bukti_foto')
                    ->label('Foto Bukti')
                    ->disk('public') // Tells Filament to look in storage/app/public
                    ->visibility('public')
                    ->square(),
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
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
                BulkAction::make('export_to_word')
    ->label('Export ke Word (Horizontal)')
    ->icon('heroicon-o-document-text')
    ->action(function (\Illuminate\Database\Eloquent\Collection $records) {
        $phpWord = new \PhpOffice\PhpWord\PhpWord();
        $section = $phpWord->addSection(['orientation' => 'landscape']); // Landscape is better for wide tables

        //  Table and Headers
        $table = $section->addTable(['borderSize' => 6, 'cellMargin' => 80]);

        $table->addRow();
        $table->addCell(1000)->addText('Sesi', ['bold' => true]);
        $table->addCell(1500)->addText('Nama Lengkap', ['bold' => true]);
        $table->addCell(1500)->addText('NIM', ['bold' => true]);
        $table->addCell(2000)->addText('Prodi', ['bold' => true]);
        $table->addCell(1500)->addText('Nomor Telepon', ['bold' => true]);
        $table->addCell(2000)->addText('Startup', ['bold' => true]);
        $table->addCell(2000)->addText('Foto Bukti', ['bold' => true]);
        $table->addCell(2000)->addText('Tanda Tangan', ['bold' => true]);

        // 2. Loop through records and add rows
        foreach ($records as $record) {
            $table->addRow(1000); // Set a minimum row height for images

            $table->addCell(2000)->addText($record->absensi->title ?? 'N/A');
            $table->addCell(3000)->addText($record->nama_lengkap);
            $table->addCell(1500)->addText($record->nim);
            $table->addCell(2000)->addText($record->program_studi);
            $table->addCell(1500)->addText($record->nomor_telepon);
            $table->addCell(2000)->addText($record->nama_startup);

            $photoCell = $table->addCell(2000);
            if ($record->bukti_foto && \Illuminate\Support\Facades\Storage::disk('public')->exists($record->bukti_foto)) {
                $fullPath = \Illuminate\Support\Facades\Storage::disk('public')->path($record->bukti_foto);
                $photoCell->addImage($fullPath, ['width' => 60, 'height' => 60]);
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

        $objWriter = IOFactory::createWriter($phpWord, 'Word2007');
        $fileName = 'Rekap-Absensi-' . now()->format('Y-m-d') . '.docx';
        $tempFile = tempnam(sys_get_temp_dir(), $fileName);
        $objWriter->save($tempFile);

        return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
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
