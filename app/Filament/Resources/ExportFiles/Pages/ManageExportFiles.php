<?php

namespace App\Filament\Resources\ExportFiles\Pages;

use App\Filament\Resources\ExportFiles\ExportFileResource;
use Filament\Resources\Pages\ManageRecords;

class ManageExportFiles extends ManageRecords
{
    protected static string $resource = ExportFileResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
