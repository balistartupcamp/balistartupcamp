import Button from '@/components/Button';
import MentorCard from '@/components/MentorCard';
import Navbar from '@/components/Navbar';
import ScheduleTable from '@/components/schedule/ScheduleTable';
import ScheduleTableHead from '@/components/schedule/ScheduleTableHead';
import ScheduleTableItem from '@/components/schedule/ScheduleTableItem';
import SponsorItem from '@/components/SponsorItem';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FAQDatas from '@/datas/faq.json';
import RundownDatas from '@/datas/rundown.json';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { ReactLenis } from 'lenis/react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Welcome() {
    const homeSection = useRef<HTMLDivElement>(null);
    const aboutSection = useRef<HTMLDivElement>(null);
    const speakersSection = useRef<HTMLDivElement>(null);
    const mentorSection = useRef<HTMLDivElement>(null);
    const scheduleSection = useRef<HTMLDivElement>(null);
    const sponsorSection = useRef<HTMLDivElement>(null);
    const faqSection = useRef<HTMLDivElement>(null);
    const ctaSection = useRef<HTMLDivElement>(null);

    const scrollToSection = (sectionId: string) => {
        console.log(sectionId);
        const sectionRef = {
            home: homeSection,
            about: aboutSection,
            speakers: speakersSection,
            mentors: mentorSection,
            schedule: scheduleSection,
            sponsor: sponsorSection,
            faq: faqSection,
            cta: ctaSection,
        }[sectionId];
        if (sectionRef && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // const handleWheel = (e: WheelEvent) => {
        //     if (e.ctrlKey || e.metaKey) {
        //         e.preventDefault();
        //     }
        // };
        // const handleKeyDown = (e: KeyboardEvent) => {
        //     if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-')) {
        //         e.preventDefault();
        //     }
        // };
        // window.addEventListener('wheel', handleWheel, { passive: false });
        // window.addEventListener('keydown', handleKeyDown, { passive: false });
        // return () => {
        //     window.removeEventListener('wheel', handleWheel);
        //     window.removeEventListener('keydown', handleKeyDown);
        // };
    }, []);
    return (
        <ReactLenis root>
            <Head title="Homepage"></Head>
            <main className="flex w-full flex-col items-center justify-center bg-[#070708]">
                {/* NAVBAR */}
                <Navbar scrollToSection={scrollToSection} />
                {/* NAVBAR */}

                {/* HERO SECTION */}
                <section ref={homeSection} className="relative flex h-screen w-full items-center justify-center">
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
                                        23 - 25 January 2026
                                    </div>
                                    {/* EVENT'S DATE */}
                                </div>
                                <h1 className="font-space text-3xl font-bold text-white sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
                                    Bali Startup <br /> Camp 2025
                                </h1>
                                <p className="font-space max-w-xl text-sm text-white opacity-80 sm:text-base md:text-lg">
                                    Temukan, bangun, dan luncurkan startup impianmu dalam 3 hari penuh inovasi, mentorship & kolaborasi nyata di Bali.
                                </p>
                            </div>
                            {/* TITLE HERO */}

                            {/* ACTION HERO */}
                            <div className="flex flex-col items-start justify-start gap-7">
                                <Button>Daftar Sekarang</Button>
                                <div className="hidden flex-row items-center justify-start gap-3 md:flex">
                                    <img src="/assets/images/hero-person.webp" alt="hero person image bsc 2025" className="h-10" />
                                    <p className="font-space text-sm text-white opacity-80 sm:text-base md:text-lg">Untuk 5 orang per tim</p>
                                </div>
                            </div>
                            {/* ACTION HERO */}
                        </div>
                    </div>
                    {/* CONTENT HERO */}
                </section>
                {/* HERO SECTION */}

                {/* ABOUT SECTION */}
                <section ref={aboutSection} className="relative flex flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-2 px-6 py-10 sm:gap-3 sm:px-12 sm:py-16 md:gap-4 md:px-16 md:py-24">
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
                <section ref={speakersSection} className="relative flex w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-4 px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-24">
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
                <section ref={mentorSection} className="relative flex w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-4 px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-24">
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
                <section ref={scheduleSection} className="relative flex w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-4 px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-24">
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
                        {/* SCHEDULE TABLEs */}
                        {RundownDatas.map((rundowndData, key) => (
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                defaultValue={key === 0 ? `rundown-item-${key}` : undefined}
                                key={key}
                            >
                                <AccordionItem value={`rundown-item-${key}`}>
                                    <ScheduleTable key={key}>
                                        <ScheduleTableHead>
                                            <AccordionTrigger className="py-0 text-sm sm:text-base md:text-lg">
                                                {rundowndData.title} Schedule
                                            </AccordionTrigger>
                                        </ScheduleTableHead>
                                        <AccordionContent>
                                            <div className="flex w-full flex-col gap-2">
                                                {rundowndData.data.map((data, index) => (
                                                    <ScheduleTableItem
                                                        key={index}
                                                        time={data.time}
                                                        total={data.duration}
                                                        title={data.activity}
                                                        description={data.description}
                                                    />
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </ScheduleTable>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </section>
                {/* SCHEDULE SECTION */}

                {/* SPONSOR SECTION */}
                <section ref={sponsorSection} className="relative flex w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-4 px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-24">
                        <p className="font-space text-xs text-white opacity-70 sm:text-sm md:text-base">Sponsors and Partners</p>
                        <h2 className="font-space mb-3 max-w-[768px] text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                            Meet the Sponsors and Partners Fueling Our
                            <span className="text-gray-200 underline"> Startup Journey</span>
                        </h2>
                        <p className="font-space max-w-[564px] text-center text-sm text-white opacity-80 sm:text-base md:text-lg">
                            Event ini didukung sponsor dan partner yang berperan besar dalam mewujudkan pengalaman terbaik bagi para peserta.
                        </p>

                        {/* SPONSOR LIST */}
                        <div className="mt-4 grid w-full grid-cols-2 flex-row flex-wrap items-start justify-start gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">
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
                <section ref={faqSection} className="relative flex w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col items-center justify-start gap-4 px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-24">
                        {/* TITLE */}
                        <p className="font-space text-xs text-white opacity-70 sm:text-sm md:text-base">Frequently Asked Question</p>
                        <h2 className="font-space mb-3 max-w-[768px] text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                            The Answers to Your Most <span className="text-gray-200 underline">Common Questions</span>
                        </h2>

                        {/* TITLE */}
                        <Accordion type="single" collapsible className="w-full max-w-xl">
                            {FAQDatas.map((faq, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger className="text-lg text-white sm:text-xl md:text-2xl">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-sm text-white sm:text-lg md:text-xl">{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
                {/* FAQ SECTION */}

                {/* CALL TO ACTION SECTION */}
                <section ref={ctaSection} className="relative flex w-full flex-col items-center justify-center">
                    <div className="max-w-9xl relative flex w-full flex-col gap-8 px-0 pt-24 sm:px-0 md:px-16">
                        <div className="relative w-full overflow-hidden">
                            {/* BOX IMAGE */}
                            <div className="flex w-full flex-row items-center justify-start gap-4">
                                <div className="moveLeft aspect-video h-96 bg-gray-800 sm:h-96 md:h-80">
                                    <img src="/assets/images/event-img-1.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="moveLeft aspect-video h-96 bg-gray-800 sm:h-96 md:h-80">
                                    <img src="/assets/images/event-img-2.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="moveLeft aspect-video h-96 bg-gray-800 sm:h-96 md:h-80">
                                    <img src="/assets/images/event-img-3.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="moveLeft aspect-video h-96 bg-gray-800 sm:h-96 md:h-80">
                                    <img src="/assets/images/event-img-4.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="moveLeft aspect-video h-96 bg-gray-800 sm:h-96 md:h-80">
                                    <img src="/assets/images/event-img-5.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="moveLeft aspect-video h-96 bg-gray-800 sm:h-96 md:h-80">
                                    <img src="/assets/images/event-img-6.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="moveLeft aspect-video h-96 bg-gray-800 sm:h-96 md:h-80">
                                    <img src="/assets/images/event-img-7.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="moveLeft aspect-video h-96 bg-gray-800 sm:h-96 md:h-80">
                                    <img src="/assets/images/event-img-1.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="moveLeft aspect-video h-96 bg-gray-800 sm:h-96 md:h-80">
                                    <img src="/assets/images/event-img-2.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                                <div className="moveLeft aspect-video h-96 bg-gray-800 sm:h-96 md:h-80">
                                    <img src="/assets/images/event-img-3.webp" alt="img" className="h-full w-full object-cover" />
                                </div>
                            </div>

                            {/* TEXT AREA */}
                            <div className="absolute top-0 left-0 flex h-full w-full flex-col items-start justify-center gap-2 px-8 py-8 sm:gap-4 md:flex-row md:items-center md:justify-between md:gap-8 md:py-0">
                                <h2 className="font-space relative z-10 w-full max-w-[468px] text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
                                    Ready to Start Your Founder Journey?
                                </h2>
                                <div className="relative z-10 flex max-w-84 flex-col items-start justify-end gap-4 md:items-end">
                                    <p className="font-space text-sm text-white sm:text-base md:text-right md:text-lg">
                                        Daftarkan timmu sekarang dan mulai perjalanan membangun startup impianmu bersama BSC 2025
                                    </p>
                                    <Button>Daftar Sekarang</Button>
                                </div>

                                {/* OVERLAY */}
                                <div className="bg-custom-gradient absolute top-0 left-0 h-full w-full"></div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* CALL TO ACTION SECTION */}

                {/* FOOTER */}
                <footer className="mt-16 flex w-full flex-col items-center justify-center">
                    <div className="max-w-9xl flex w-full flex-col justify-center px-6 sm:px-12 md:px-16">
                        {/* MAIN FOOTER */}
                        <div className="flex w-full flex-col items-start justify-between gap-5 md:flex-row">
                            {/* ABOUT FOOTER */}
                            <div className="flex flex-col items-start justify-between gap-8 md:gap-24">
                                <div className="flex flex-col items-start justify-start gap-6">
                                    <a href="/">
                                        <img src="/assets/images/logo_bnw_full.webp" alt="logo bsc 2025" className="h-10 sm:h-12 md:h-15" />
                                    </a>
                                    <p className="font-space text-sm text-white opacity-80 sm:text-base md:max-w-lg md:text-lg">
                                        Bali Startup Camp 2025 adalah program intensif tahunan dari Primakara University untuk membentuk startup
                                        digital melalui proses ideasi, mentoring, dan pitching
                                    </p>
                                </div>

                                <div className="flex flex-col items-start justify-start gap-4">
                                    <p className="font-space max-w-sm text-sm text-white opacity-80 sm:text-base md:text-lg">Temukan kami di</p>
                                    <div className="flex flex-row items-center justify-start gap-3">
                                        <a href="https://www.instagram.com/bali.startup/" className="text-white">
                                            <InstagramIcon className="h-6 w-6 text-white opacity-60 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                                        </a>
                                        <a href="https://web.facebook.com/primakara/?locale=id_ID&_rdc=1&_rdr#" className="text-white">
                                            <FacebookIcon className="h-6 w-6 text-white opacity-60 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                                        </a>
                                        <a href="https://www.youtube.com/@balistartupcamp4465" className="text-white">
                                            <YoutubeIcon className="h-6 w-6 text-white opacity-60 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* NAVIGATION FOOTER */}
                            <div className="mt-8 flex w-full flex-row items-start justify-start gap-16 md:mt-19 md:w-auto md:justify-end lg:gap-24 xl:gap-32">
                                <div className="flex flex-col items-start justify-start gap-2">
                                    <p className="font-space text-sm font-medium text-white sm:text-base md:text-lg">Navigasi</p>
                                    <button
                                        onClick={() => scrollToSection('home')}
                                        className="font-base font-space text-xs text-white opacity-70 hover:opacity-100 sm:text-sm md:text-base"
                                    >
                                        Home
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('about')}
                                        className="font-base font-space text-xs text-white opacity-70 hover:opacity-100 sm:text-sm md:text-base"
                                    >
                                        Tentang Kami
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('speakers')}
                                        className="font-base font-space text-xs text-white opacity-70 hover:opacity-100 sm:text-sm md:text-base"
                                    >
                                        Narasumber & Mentor
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('schedule')}
                                        className="font-base font-space text-xs text-white opacity-70 hover:opacity-100 sm:text-sm md:text-base"
                                    >
                                        Jadwal Acara
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('sponsor')}
                                        className="font-base font-space text-xs text-white opacity-70 hover:opacity-100 sm:text-sm md:text-base"
                                    >
                                        Sponsor dan Partner
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('faq')}
                                        className="font-base font-space text-xs text-white opacity-70 hover:opacity-100 sm:text-sm md:text-base"
                                    >
                                        FAQ
                                    </button>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-2">
                                    <p className="font-space text-sm font-medium text-white sm:text-base md:text-lg">Bantuan</p>
                                    <a
                                        href="https://wa.me/6282147078126?text=Halo%20kak%2C%20saya%20perlu%20bantuan%20terkait%20BSC%202025"
                                        className="font-base font-space text-xs text-white opacity-70 hover:opacity-100 sm:text-sm md:text-base"
                                    >
                                        Admin - Abi
                                    </a>
                                    <a
                                        href="https://wa.me/6287862181829?text=Halo%20kak%2C%20saya%20perlu%20bantuan%20terkait%20BSC%202025"
                                        className="font-base font-space text-xs text-white opacity-70 hover:opacity-100 sm:text-sm md:text-base"
                                    >
                                        Admin - Ezy
                                    </a>
                                    <a
                                        href="https://wa.me/62895622771393?text=Halo%20kak%2C%20saya%20perlu%20bantuan%20terkait%20BSC%202025"
                                        className="font-base font-space text-xs text-white opacity-70 hover:opacity-100 sm:text-sm md:text-base"
                                    >
                                        Admin - Wira
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* MAIN FOOTER */}

                        {/* COPYRIGHT */}
                        <div className="mt-8 flex w-full flex-col items-center justify-between gap-2 border-t border-dashed border-white/30 pt-8 sm:flex-row md:gap-5">
                            <p className="font-space max-w-sm text-center text-sm text-white opacity-80 sm:text-left sm:text-base md:text-lg">
                                © 2025 BaliStartupCamp. All rights reserved.
                            </p>
                            <p className="font-space mb-6 max-w-sm text-center text-sm text-white opacity-80 sm:mb-0 sm:text-right sm:text-base md:text-lg">
                                Desain oleh Panitia BSC 2025
                            </p>
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
