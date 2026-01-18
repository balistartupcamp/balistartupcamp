<?php
namespace App\Livewire;

use App\Models\Absensi;
use App\Models\Attendance;
use Filament\Actions\Concerns\InteractsWithActions; // Add this
use Filament\Actions\Contracts\HasActions;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Concerns\InteractsWithSchemas; // Correct for v4
use Filament\Schemas\Contracts\HasSchemas;         // Correct for v4
use Filament\Schemas\Schema;                      // Changed from Form
use Livewire\Component;
use Illuminate\Contracts\View\View;
use Saade\FilamentAutograph\Forms\Components\SignaturePad;
class PublicAbsensiForm extends Component implements HasSchemas, HasActions
{
    use InteractsWithSchemas;
    use InteractsWithActions;

    public ?array $data = [];
    public Absensi $absensi;

    public function mount(Absensi $absensi): void
    {
        if (!$absensi->is_active) {
            abort(403, 'Sesi absensi ini sudah ditutup.');
        }

        $this->absensi = $absensi;

        // This works in v4 because InteractsWithSchemas dynamically
        // maps the form() method to $this->form
        $this->form->fill();
    }

    // Change Form $form to Schema $schema
    public function form(Schema $schema): Schema
    {
        // Change ->schema() to ->components()
        return $schema
            ->components([
                \Filament\Schemas\Components\View::make('forms.absensi-header'),

                Section::make($this->absensi->title)
                    ->extraAttributes(['style' => 'font-size: 24px;'])
                    ->description('Silakan isi data kehadiran Anda.')
                    ->schema([ // Layout components inside a Section still use ->schema()
                        TextInput::make('nama_lengkap')
                            ->label('Nama Lengkap')
                            ->required(),

                        Grid::make(2)->schema([
                            TextInput::make('nim')
                                ->label('NIM')
                                ->required()
                                ->numeric()
                                ->unique(
                                    table: 'attendance',
                                    column: 'nim',
                                    ignorable: null,
                                    modifyRuleUsing: fn ($rule) => $rule->where('absensi_id', $this->absensi->id)
                                )
                                ->validationMessages([
                                    'unique' => 'Anda sudah melakukan absensi untuk sesi ini.',
                                ]),
                            Select::make('program_studi')
                                ->label('Program Studi')
                                ->options([
                                    'Informatika' => 'Informatika',
                                    'Sistem Informasi' => 'Sistem Informasi',
                                    'Sistem Informasi Akuntansi' => 'Sistem Informasi Akuntansi',
                                    'Desain Komunikasi Visual' => 'Desain Komunikasi Visual',
                                    'Manajemen' => 'Manajemen',
                                    'Akuntansi' => 'Akuntansi',
                                    'Bisnis Digital' => 'Bisnis Digital',
                                ])
                                ->required()
                                ->native(false),
                        ]),

                        TextInput::make('nama_startup')
                            ->label('Nama Startup')
                            ->required(),

                        TextInput::make('nomor_telepon')
                            ->label('Nomor Telepon')
                            ->tel()
                            ->numeric()
                            ->required(),

                        FileUpload::make('bukti_foto')
                            ->label('Foto Bukti')
                            ->directory('attendance/foto')
                            ->disk('r2') // Change this from 'private' to 'public's
                            ->image()
                            ->visibility('public') // Ensures the file is readable by the web server
                            ->required()
                            ->maxSize(512),

                        SignaturePad::make('ttd')
                            ->label('Tanda Tangan Digital')
                            ->required()
                            ->extraAttributes([
                                'style' => 'aspect-ratio: 16/9; width: 100%;',
                                'class' => 'border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg',
                            ])
                            ->maxWidth(10)
                            ->backgroundColor('rgba(0,0,0,0)')
                            ->backgroundColorOnDark('rgba(0,0,0,0)')
                            ->penColor('#3b82f6')
                            ->penColorOnDark('#000000')
                            ->exportBackgroundColor('#ffffff')
                            ->exportPenColor('#000000'),

                         ])
            ])
            ->statePath('data')
            ->model(Attendance::class);
    }

    public function submit(): void
    {
        // Use getState() to validate and retrieve data
        $formData = $this->form->getState();

        $formData['absensi_id'] = $this->absensi->id;

        Attendance::create($formData);

        session()->flash('success', 'Absensi berhasil terkirim!');
        session()->flash('nama', $formData['nama_lengkap']);

        $this->redirectRoute('absensi.success');
    }

    public function render(): View
    {
        return view('livewire.public-absensi-form');
    }
}
