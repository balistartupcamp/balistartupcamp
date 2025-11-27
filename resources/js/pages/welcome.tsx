import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { ReactLenis } from 'lenis/react';

export default function Welcome() {
    return (
        <ReactLenis root>
            <Head title="Homepage"></Head>
            <main className="flex w-full flex-col items-center justify-center bg-[#070708]">
                {/* HERO SECTION */}
                <section className="relative flex h-screen w-full items-center justify-center">
                    {/* BACKGROUND HERO */}
                    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center overflow-hidden">
                        <img src="/assets/images/hero-image.webp" alt="hero image bali startup camp 2025" className="h-full w-full object-cover" />
                        <div className="absolute top-0 left-0 h-full w-full bg-linear-to-b from-black/30 to-black/90"></div>
                    </div>
                    {/* BACKGROUND HERO */}
                    {/* CONTENT HERO */}
                    <div className="max-w-9xl justify-startx relative z-10 flex h-full w-full flex-row items-end px-16 py-24">
                        <div className="flex flex-row items-end justify-between gap-8">
                            {/* TITLE HERO */}
                            <div className="flex flex-col items-start justify-start gap-5">
                                <div className="mb-2 flex flex-col items-start justify-start gap-3">
                                    {/* EVENT'S LOCATION */}
                                    <div className="font-space flex flex-row items-center justify-start gap-3 text-lg font-medium text-white">
                                        <MapPinIcon className="h-6" />
                                        4th Floor Primakara University
                                    </div>
                                    {/* EVENT'S LOCATION */}
                                    {/* EVENT'S DATE */}
                                    <div className="font-space flex flex-row items-center justify-start gap-3 text-lg font-medium text-white">
                                        <CalendarIcon className="h-6" />
                                        13 - 15 January 2025
                                    </div>
                                    {/* EVENT'S DATE */}
                                </div>
                                <h1 className="font-space text-8xl font-bold text-white">
                                    Bali Startup <br /> Camp 2025
                                </h1>
                                <p className="font-space text-lg text-white opacity-80">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati corporis odit fugit!
                                </p>
                            </div>
                            {/* TITLE HERO */}
                        </div>
                    </div>
                    {/* CONTENT HERO */}
                </section>
                {/* HERO SECTION */}
            </main>
        </ReactLenis>
    );
}
