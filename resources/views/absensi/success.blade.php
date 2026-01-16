<x-layouts.app>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center">
            <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <svg class="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mb-2">Absensi Berhasil!</h2>
            <p class="text-gray-600 mb-8 text-xl">
                Terima kasih {{ session('nama') }}, data kehadiran telah berhasil direkam ke dalam sistem kami.
            </p>

            <a href="/"
                class="inline-block w-full text-xl py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-primary-700 transition duration-200">
                Kembali ke Beranda
            </a>
        </div>
    </div>
</x-layouts.app>
