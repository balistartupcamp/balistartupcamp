<?php

namespace App\Filament\Resources\Attendances;

use App\Filament\Resources\Attendances\Pages\ManageAttendances;
use App\Models\Attendance;
use BackedEnum;
use Dom\Text;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
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
use Nette\Utils\ImageColor;
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
                ImageEntry::make('bukti_foto'),
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
                    ->searchable(),
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
