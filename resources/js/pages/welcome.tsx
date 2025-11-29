import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { ReactLenis } from 'lenis/react';

export default function Welcome() {
    return (
        <ReactLenis root>
            <Head title="Homepage"></Head>
            <main className="flex w-full flex-col items-center justify-center bg-[#070708]">
                {/* NAVBAR */}
                <Navbar />
                {/* NAVBAR */}

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
                        <div className="flex w-full flex-row items-end justify-between gap-8">
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

                            {/* ACTION HERO */}
                            <div className="flex flex-col items-start justify-start gap-7">
                                <Button>Daftar Sekarang</Button>
                                <div className="flex flex-row items-center justify-start gap-3">
                                    <img src="/assets/images/hero-person.webp" alt="hero person image bsc 2025" className="h-10" />
                                    <p className="font-space text-lg text-white opacity-80">Untuk 4 - 5 orang per tim</p>
                                </div>
                            </div>
                            {/* ACTION HERO */}
                        </div>
                    </div>
                    {/* CONTENT HERO */}
                </section>
                {/* HERO SECTION */}

                {/* ABOUT SECTION */}
                <section className="relative flex flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start px-16 py-24">
                        <p className="font-space text-white opacity-70">About</p>
                        <h2 className="font-space text-6xl font-bold text-white">Lorem ipsum dolor sit amet consectetur.</h2>
                        <p className="font-space text-lg text-white opacity-80">Untuk 4 - 5 orang per tim</p>
                    </div>
                </section>
                {/* ABOUT SECTION */}

                {/* OVERLAY */}
                <div className="pointer-events-none fixed bottom-0 left-0 h-25 w-full">
                    <div className="absolute h-full w-full overflow-hidden" style={{ inset: 0 }}>
                        <div
                            className="pointer-none absolute z-[1] h-full w-full"
                            style={{
                                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)',
                                backdropFilter: 'blur(0.0546875px)',
                                willChange: 'auto',
                            }}
                        ></div>
                        <div
                            className="pointer-none absolute z-[2] h-full w-full"
                            style={{
                                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)',
                                backdropFilter: 'blur(0.109375px)',
                                willChange: 'auto',
                            }}
                        ></div>
                        <div
                            className="pointer-none absolute z-[3] h-full w-full"
                            style={{
                                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)',
                                backdropFilter: 'blur(0.21875px)',
                                willChange: 'auto',
                            }}
                        ></div>
                        <div
                            className="pointer-none absolute z-[4] h-full w-full"
                            style={{
                                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)',
                                backdropFilter: 'blur(0.4375px)',
                                willChange: 'auto',
                            }}
                        ></div>
                        <div
                            className="pointer-none absolute z-[5] h-full w-full"
                            style={{
                                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)',
                                backdropFilter: 'blur(0.875px)',
                                willChange: 'auto',
                            }}
                        ></div>
                        <div
                            className="pointer-none absolute z-[6] h-full w-full"
                            style={{
                                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
                                backdropFilter: 'blur(1.75px)',
                                willChange: 'auto',
                            }}
                        ></div>
                        <div
                            className="pointer-none absolute z-[7] h-full w-full"
                            style={{
                                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)',
                                backdropFilter: 'blur(3.5px)',
                                willChange: 'auto',
                            }}
                        ></div>
                        <div
                            className="pointer-none absolute z-[8] h-full w-full"
                            style={{
                                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)',
                                backdropFilter: 'blur(7px)',
                                willChange: 'auto',
                            }}
                        ></div>
                    </div>
                </div>
            </main>
        </ReactLenis>
    );
}
