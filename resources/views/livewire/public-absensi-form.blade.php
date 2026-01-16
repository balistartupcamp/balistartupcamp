<div class="max-w-3xl mx-auto py-12 px-4">
    <form wire:submit="submit">
        {{ $this->form }}

        <div class="mt-6 flex justify-end">
            <button type="submit"
                class="w-full md:w-auto px-6 py-3 text-xl bg-blue-500 text-white font-bold rounded-lg hover:bg-primary-700 transition">
                Kirim Absensi
            </button>
        </div>
    </form>

    <x-filament-actions::modals />
</div>
