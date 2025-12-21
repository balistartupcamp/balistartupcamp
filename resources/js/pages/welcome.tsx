import Button from '@/components/Button';
import MentorCard from '@/components/MentorCard';
import Navbar from '@/components/Navbar';
import ScheduleTable from '@/components/schedule/ScheduleTable';
import ScheduleTableHead from '@/components/schedule/ScheduleTableHead';
import ScheduleTableItem from '@/components/schedule/ScheduleTableItem';
import SponsorItem from '@/components/SponsorItem';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { ReactLenis } from 'lenis/react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';

export default function Welcome() {
    // useEffect(() => {
    //     const handleWheel = (e: WheelEvent) => {
    //         if (e.ctrlKey || e.metaKey) {
    //             e.preventDefault();
    //         }
    //     };

    //     const handleKeyDown = (e: KeyboardEvent) => {
    //         if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-')) {
    //             e.preventDefault();
    //         }
    //     };

    //     window.addEventListener('wheel', handleWheel, { passive: false });
    //     window.addEventListener('keydown', handleKeyDown, { passive: false });

    //     return () => {
    //         window.removeEventListener('wheel', handleWheel);
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);
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
                    <div className="max-w-9xl justify-startx relative z-10 flex h-full w-full flex-row items-end px-6 py-14 sm:px-12 sm:py-20 md:px-16 md:py-24">
                        <div className="flex w-full flex-col items-start justify-between gap-6 sm:gap-7 md:flex-row md:items-end md:gap-8">
                            {/* TITLE HERO */}
                            <div className="flex flex-col items-start justify-start gap-3 sm:gap-4 md:gap-5">
                                <div className="mb-2 flex flex-col items-start justify-start gap-3">
                                    {/* EVENT'S LOCATION */}
                                    <div className="font-space flex flex-row items-center justify-start gap-1 text-xs font-medium text-white sm:gap-3 sm:text-base md:text-lg">
                                        <MapPinIcon className="h-4 sm:h-5 md:h-6" />
                                        4th Floor Primakara University
                                    </div>
                                    {/* EVENT'S LOCATION */}
                                    {/* EVENT'S DATE */}
                                    <div className="font-space flex flex-row items-center justify-start gap-1 text-xs font-medium text-white sm:gap-3 sm:text-base md:text-lg">
                                        <CalendarIcon className="h-4 sm:h-5 md:h-6" />
                                        23 - 25 January 2025
                                    </div>
                                    {/* EVENT'S DATE */}
                                </div>
                                <h1 className="font-space text-3xl font-bold text-white sm:text-4xl md:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                                    Bali Startup <br /> Camp 2025
                                </h1>
                                <p className="font-space text-sm text-white opacity-80 sm:text-base md:text-lg">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati corporis odit fugit!
                                </p>
                            </div>
                            {/* TITLE HERO */}

                            {/* ACTION HERO */}
                            <div className="flex flex-col items-start justify-start gap-7">
                                <Button>Daftar Sekarang</Button>
                                <div className="hidden flex-row items-center justify-start gap-3 md:flex">
                                    <img src="/assets/images/hero-person.webp" alt="hero person image bsc 2025" className="h-10" />
                                    <p className="font-space text-sm text-white opacity-80 sm:text-base md:text-lg">Untuk 4 - 5 orang per tim</p>
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
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-2 px-6 py-24 sm:gap-3 sm:px-12 md:gap-4 md:px-16">
                        <p className="font-space text-xs text-white opacity-70 sm:text-sm md:text-base">About</p>
                        <h2 className="font-space mb-3 max-w-[768px] text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                            The Beginning of Every <span className="text-gray-200 underline">Great Startup</span> Story
                        </h2>
                        <p className="font-space max-w-[768px] text-center text-sm text-white opacity-80 sm:text-base md:text-lg">
                            Bali Startup Camp menyatukan mahasiswa kreatif untuk merancang ide startup dan berkolaborasi dalam tim. Sebuah pengalaman
                            intens yang membuka peluang dan membentuk masa depan inovasi.
                        </p>

                        {/* VIDEO */}
                        <div className="mt-4 flex aspect-[21/11] w-full max-w-4xl items-center justify-center overflow-hidden rounded-sm bg-white sm:mt-6 sm:rounded-md md:mt-8 md:rounded-lg">
                            <video className="w-full" autoPlay muted loop>
                                <source src="/assets/videos/rewind_video_2025.mp4" />
                            </video>
                        </div>
                        <p className="font-space mt-3 text-center text-xs text-white italic opacity-40 sm:text-sm md:text-base">
                            Video berdasarkan event Bali Startup Camp sebelumnya
                        </p>
                    </div>
                </section>
                {/* ABOUT SECTION */}

                {/* SPEAKERS */}
                <section className="relative flex w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-4 px-6 py-24 sm:px-12 md:px-16">
                        {/* HEAD SECTION */}
                        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                            <div className="flex max-w-[768px] flex-col items-start justify-start gap-4">
                                <p className="font-space text-xs text-white opacity-70 sm:text-sm md:text-base">Our Speakers</p>
                                <h2 className="font-space mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                                    Expert Speakers Sharing <span className="text-gray-200 underline">Real World Wisdom</span>
                                </h2>
                            </div>
                            <Button>Daftar Sekarang</Button>
                        </div>
                        {/* MENTOR LIST */}
                        <div className="smgrid-cols-2 mt-6 grid w-full grid-cols-1 flex-wrap items-stretch justify-start gap-4 overflow-hidden md:grid-cols-3">
                            <MentorCard />
                            <MentorCard />
                            <MentorCard />
                        </div>
                    </div>
                </section>

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
                {/* OVERLAY */}

                {/* MENTOR'S SECTION */}
                <section className="relative flex w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-4 px-6 py-24 sm:px-12 md:px-16">
                        <p className="font-space text-xs text-white opacity-70 sm:text-sm md:text-base">Our Mentors</p>
                        <h2 className="font-space mb-3 max-w-[768px] text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                            Meet the Mentors Guiding Your <span className="text-gray-200 underline">Startup Journey</span>
                        </h2>
                        <p className="font-space max-w-[564px] text-center text-sm text-white opacity-80 sm:text-base md:text-lg">
                            Dibimbing oleh para ahli industri yang telah membangun dan mengembangkan startup secara nyata.
                        </p>

                        {/* MENTOR LIST */}
                        <div className="mt-6 grid w-full grid-cols-1 flex-wrap items-stretch justify-start gap-4 overflow-hidden sm:grid-cols-2 md:grid-cols-3">
                            <MentorCard />
                            <MentorCard />
                            <MentorCard />
                            <MentorCard />
                            <MentorCard />
                            <MentorCard />
                            <MentorCard />
                            <MentorCard />
                            <MentorCard />
                            <MentorCard />
                        </div>
                    </div>
                </section>
                {/* MENTOR'S SECTION */}

                {/* SCHEDULE SECTION */}
                <section className="relative flex w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-4 px-6 py-24 sm:px-12 md:px-16">
                        {/* HEAD SECTION */}
                        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                            <div className="flex max-w-[678px] flex-col items-start justify-start gap-4">
                                <p className="font-space text-xs text-white opacity-70 sm:text-sm md:text-base">Event's Schedule</p>
                                <h2 className="font-space mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                                    Your Startup Camp Schedule and <span className="text-gray-200 underline">Daily Flow</span>
                                </h2>
                            </div>
                            <Button>Daftar Sekarang</Button>
                        </div>
                        {/* SCHEDULE TABLE */}
                        <ScheduleTable>
                            <ScheduleTableHead>Day 1 Schedule</ScheduleTableHead>
                            <ScheduleTableItem
                                time="09.00 - 10.00 AM"
                                total={1}
                                title="Judulnya"
                                description="Contoh deskripsi agak sedikit panjang untuk deskripsi acara"
                            />
                            <ScheduleTableItem
                                time="09.00 - 10.00 AM"
                                total={1}
                                title="Judulnya"
                                description="Contoh deskripsi agak sedikit panjang untuk deskripsi acara"
                            />
                            <ScheduleTableItem
                                time="09.00 - 10.00 AM"
                                total={1}
                                title="Judulnya"
                                description="Contoh deskripsi agak sedikit panjang untuk deskripsi acara"
                            />
                            <ScheduleTableItem
                                time="09.00 - 10.00 AM"
                                total={1}
                                title="Judulnya"
                                description="Contoh deskripsi agak sedikit panjang untuk deskripsi acara"
                            />
                        </ScheduleTable>
                    </div>
                </section>
                {/* SCHEDULE SECTION */}

                {/* SPONSOR SECTION */}
                <section className="relative flex hidden w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-4 px-16 py-24">
                        <p className="font-space text-white opacity-70">Sponsors and Partners</p>
                        <h2 className="font-space mb-3 max-w-[768px] text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                            Meet the Sponsors and Partners Fueling Our
                            <span className="text-gray-200 underline"> Startup Journey</span>
                        </h2>
                        <p className="font-space max-w-[564px] text-center text-lg text-white opacity-80">
                            Event ini didukung sponsor dan partner yang berperan besar dalam mewujudkan pengalaman terbaik bagi para peserta.
                        </p>

                        {/* SPONSOR LIST */}
                        <div className="mt-4 grid w-full grid-cols-3 flex-row flex-wrap items-start justify-start gap-4">
                            <SponsorItem />
                            <SponsorItem />
                            <SponsorItem />
                            <SponsorItem />
                            <SponsorItem />
                            <SponsorItem />
                            <SponsorItem />
                            <SponsorItem />
                            <SponsorItem />
                        </div>
                    </div>
                </section>
                {/* SPONSOR SECTION */}

                {/* FAQ SECTION */}
                <section className="relative flex hidden w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-4 px-16 py-24">
                        {/* TITLE */}
                        <p className="font-space text-white opacity-70">Frequently Asked Question</p>
                        <h2 className="font-space mb-3 max-w-[768px] text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                            The Answers to Your Most <span className="text-gray-200 underline">Common Questions</span>
                        </h2>

                        {/* TITLE */}
                        <Accordion type="single" collapsible className="w-full max-w-xl">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-2xl text-white">Apakah peserta harus sudah memiliki tim?</AccordionTrigger>
                                <AccordionContent className="text-xl text-white">
                                    Ya. Peserta wajib mendaftar dalam bentuk tim karena seluruh proses akan berfokus pada pengembangan ide secara
                                    kolaboratif.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-2xl text-white">Apakah peserta harus sudah memiliki ide startup?</AccordionTrigger>
                                <AccordionContent className="text-xl text-white">
                                    Ya. Setiap tim harus datang dengan ide awal, yang kemudian akan dibimbing untuk diperdalam, divalidasi, dan
                                    dimatangkan selama acara.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-2xl text-white">Apa saja yang perlu dibawa oleh peserta?</AccordionTrigger>
                                <AccordionContent className="text-xl text-white">
                                    Laptop, charger, kebutuhan pribadi, serta bahan pendukung ide startup jika ada.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-2xl text-white">Apakah akan ada sesi mentoring selama acara?</AccordionTrigger>
                                <AccordionContent className="text-xl text-white">
                                    Ya. Mentor berpengalaman akan membantu tim dalam proses validasi, strategi produk, dan persiapan pitching final.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5">
                                <AccordionTrigger className="text-2xl text-white">Apakah acara ini berbayar?</AccordionTrigger>
                                <AccordionContent className="text-xl text-white">
                                    Informasi biaya pendaftaran tersedia pada halaman registrasi dan mencakup seluruh fasilitas acara.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
                {/* FAQ SECTION */}

                {/* CALL TO ACTION SECTION */}
                <section className="relative flex hidden w-full flex-col items-center justify-center">
                    <div className="max-w-9xl relative flex w-full flex-col gap-8 px-16 pt-24">
                        <div className="relative w-full overflow-hidden">
                            {/* BOX IMAGE */}
                            <div className="moveLeft flex w-full flex-row items-center justify-start gap-4">
                                <div className="aspect-video h-80 bg-gray-800">
                                    <img src="/assets/images/event-img-1.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="aspect-video h-80 bg-gray-800">
                                    <img src="/assets/images/event-img-2.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="aspect-video h-80 bg-gray-800">
                                    <img src="/assets/images/event-img-3.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="aspect-video h-80 bg-gray-800">
                                    <img src="/assets/images/event-img-4.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="aspect-video h-80 bg-gray-800">
                                    <img src="/assets/images/event-img-5.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="aspect-video h-80 bg-gray-800">
                                    <img src="/assets/images/event-img-6.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="aspect-video h-80 bg-gray-800">
                                    <img src="/assets/images/event-img-7.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="aspect-video h-80 bg-gray-800">
                                    <img src="/assets/images/event-img-1.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="aspect-video h-80 bg-gray-800">
                                    <img src="/assets/images/event-img-2.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="aspect-video h-80 bg-gray-800">
                                    <img src="/assets/images/event-img-3.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                            </div>

                            {/* TEXT AREA */}
                            <div className="absolute top-0 left-0 flex h-full w-full flex-row items-center justify-between gap-8 px-8">
                                <h2 className="font-space relative z-10 w-full max-w-[468px] text-6xl font-semibold text-white">
                                    Ready to Start Your Founder Journey?
                                </h2>
                                <div className="relative z-10 flex max-w-84 flex-col items-end justify-end gap-4">
                                    <p className="font-space text-right text-lg text-white">
                                        Daftarkan timmu sekarang dan mulai perjalanan membangun startup impianmu bersama BSC 2025
                                    </p>
                                    <Button>Daftar Sekarang</Button>
                                </div>

                                {/* OVERLAY */}
                                <div className="bg-custom-gradient absolute top-0 left-0 h-full w-full"></div>
                                {/* <div className="absolute top-0 left-0 h-full w-full bg-linear-to-r from-[#070708] to-[#070708]/5"></div> */}
                            </div>
                        </div>
                    </div>
                </section>
                {/* CALL TO ACTION SECTION */}

                {/* FOOTER */}
                <footer className="mt-16 flex hidden w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col justify-center">
                        {/* MAIN FOOTER */}
                        <div className="flex w-full flex-row items-start justify-between gap-5">
                            {/* ABOUT FOOTER */}
                            <div className="flex flex-col items-start justify-between gap-24">
                                <div className="flex flex-col items-start justify-start gap-6">
                                    <a href="/">
                                        <img src="/assets/images/logo_bnw_full.webp" alt="logo bsc 2025" className="h-15" />
                                    </a>
                                    <p className="font-space max-w-sm text-lg text-white opacity-80">
                                        Bali Startup Camp 2025 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem!
                                    </p>
                                </div>

                                <div className="flex flex-col items-start justify-start gap-4">
                                    <p className="font-space max-w-sm text-lg text-white opacity-80">Temukan kami di</p>
                                    <div className="flex flex-row items-center justify-start gap-3">
                                        <a href="https://instagram.com" className="text-white">
                                            <InstagramIcon className="h-8 w-8 text-white opacity-60" />
                                        </a>
                                        <a href="https://instagram.com" className="text-white">
                                            <FacebookIcon className="h-8 w-8 text-white opacity-60" />
                                        </a>
                                        <a href="https://instagram.com" className="text-white">
                                            <YoutubeIcon className="h-8 w-8 text-white opacity-60" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* NAVIGATION FOOTER */}
                            <div className="mt-19 flex flex-row items-start justify-end gap-32">
                                <div className="flex flex-col items-start justify-start gap-2">
                                    <p className="font-space text-sm font-medium text-white sm:text-base md:text-lg">Navigasi</p>
                                    <a href="#" className="font-base font-space text-base text-white opacity-70 hover:opacity-100">
                                        Home
                                    </a>
                                    <a href="#" className="font-base font-space text-base text-white opacity-70 hover:opacity-100">
                                        Tentang Kami
                                    </a>
                                    <a href="#" className="font-base font-space text-base text-white opacity-70 hover:opacity-100">
                                        Narasumber & Mentor
                                    </a>
                                    <a href="#" className="font-base font-space text-base text-white opacity-70 hover:opacity-100">
                                        Jadwal Acara
                                    </a>
                                    <a href="#" className="font-base font-space text-base text-white opacity-70 hover:opacity-100">
                                        Sponsor dan Partner
                                    </a>
                                    <a href="#" className="font-base font-space text-base text-white opacity-70 hover:opacity-100">
                                        FAQ
                                    </a>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-2">
                                    <p className="font-space text-sm font-medium text-white sm:text-base md:text-lg">Bantuan</p>
                                    <a href="#" className="font-base font-space text-base text-white opacity-70 hover:opacity-100">
                                        Admin - Abi
                                    </a>
                                    <a href="#" className="font-base font-space text-base text-white opacity-70 hover:opacity-100">
                                        Admin - Ezy
                                    </a>
                                    <a href="#" className="font-base font-space text-base text-white opacity-70 hover:opacity-100">
                                        Admin - Wira
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* MAIN FOOTER */}

                        {/* COPYRIGHT */}
                        <div className="mt-8 flex w-full flex-row items-center justify-between gap-5 border-t border-dashed border-white/30 pt-8">
                            <p className="font-space max-w-sm text-lg text-white opacity-80">© 2025 BaliStartupCamp. All rights reserved.</p>
                            <p className="font-space max-w-sm text-lg text-white opacity-80">Desain oleh Panitia BSC 2025</p>
                        </div>
                        {/* COPYRIGHT */}
                    </div>
                    <div className="w-full">
                        <img src="/assets/images/footer-logo.svg" alt="" className="w-full" />
                    </div>
                </footer>
            </main>
        </ReactLenis>
    );
}
