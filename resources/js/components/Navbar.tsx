'use client';

import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const lenis = useLenis();

    const menuRef = useRef<HTMLDivElement>(null);
    const menuLinksRef = useRef<HTMLDivElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!lenis) return;
        if (menuOpen) return;

        const handleScroll = ({ scroll }: { scroll: number }) => {
            if (scroll > lastScroll && scroll > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            setLastScroll(scroll);
        };

        lenis.on('scroll', handleScroll);

        return () => {
            lenis.off('scroll', handleScroll);
        };
    }, [lenis, lastScroll, menuOpen]);

    // Initialize GSAP timeline
    useEffect(() => {
        timelineRef.current = gsap.timeline({ paused: true });

        if (!menuRef.current || !menuLinksRef.current) return;

        const menuOverlay = menuRef.current;
        const linksContainer = menuLinksRef.current;
        const links = linksContainer.querySelectorAll('a.alink');
        const image = imageRef.current;
        const social = socialRef.current;

        // Timeline sequence
        timelineRef.current
            // Step 1: Slide overlay from right to left
            .fromTo(menuOverlay, { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.6, ease: 'power3.inOut' }, 0)
            // Step 2: Wait 300ms
            .to({}, { duration: 0.3 }, '+=0')
            // Step 3: Animate links one by one
            .fromTo(links, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '<+=0.3')
            // Step 4: Animate socials
            .fromTo(social, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '<+=0.4')
            // Step 5: Animate image clippath
            .fromTo(image, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, '<+=0.001');
    }, []);

    const handleMenuToggle = () => {
        if (!timelineRef.current) return;

        if (menuOpen) {
            timelineRef.current.reverse();
            setTimeout(() => {
                setMenuOpen(false);
                setHidden(false);
            }, 2000);
        } else {
            timelineRef.current.play();
            setMenuOpen(true);
            setHidden(true);
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 z-50 flex w-full items-center justify-center transition-all duration-500 ${
                    hidden ? '-translate-y-[120%]' : 'translate-y-0'
                }`}
            >
                <div className="max-w-9xl w-full rounded-3xl px-9 py-5">
                    <div className="flex flex-row items-center justify-between gap-4 rounded-xl bg-gray-100/5 px-6 py-4 backdrop-blur-xs">
                        <a href="/">
                            <img src="/assets/images/logo_bnw_full.webp" alt="logo bsc 2025" className="h-11" />
                        </a>

                        <button
                            onClick={handleMenuToggle}
                            className="flex cursor-pointer flex-row items-center justify-center gap-3 rounded-xl bg-gray-100/5 px-5 py-3 backdrop-blur-xs transition-colors hover:bg-gray-100/10"
                        >
                            <p className="font-space text-lg text-white">Navigation</p>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <span className="h-[2px] w-7 rounded-full bg-gray-100"></span>
                                <span className="h-[2px] w-5 rounded-full bg-gray-100"></span>
                                <span className="h-[2px] w-7 rounded-full bg-gray-100"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* MENU OVERLAY */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 z-40 hidden h-full w-full items-center justify-start gap-20 bg-black/70 backdrop-blur-md"
                style={{ display: menuOpen ? 'flex' : 'none', opacity: 0 }}
            >
                {/* IMAGE AREA  */}
                <div className="relative h-full w-[480px] min-w-[480px] overflow-hidden">
                    <img src="/assets/images/navbar_img.webp" alt="bsc 2025 image" ref={imageRef} className="h-full w-full object-cover" />
                </div>

                {/* NAVIGATION LIST */}
                <div ref={menuLinksRef} className="flex w-full flex-col items-start justify-start gap-15 pe-20">
                    <a href="#" className="font-space alink text-5xl font-medium text-white">
                        About Event
                    </a>
                    <a href="#" className="font-space alink text-5xl font-medium text-white">
                        Our Mentors
                    </a>
                    <a href="#" className="font-space alink text-5xl font-medium text-white">
                        Valuable Speakers
                    </a>
                    <a href="#" className="font-space alink text-5xl font-medium text-white">
                        Event Timeline
                    </a>
                    <a href="#" className="font-space alink text-5xl font-medium text-white">
                        Best Memories
                    </a>
                    <div ref={socialRef} className="flex w-full flex-row items-center justify-between">
                        <a href="https://balistartup.com" className="font-space text-xl font-medium text-white">
                            balistartup.com
                        </a>
                        <span className="font-space text-xl font-medium text-white">|</span>
                        <a href="" className="font-space text-xl font-medium text-white">
                            Instagram
                        </a>
                        <span className="font-space text-xl font-medium text-white">|</span>
                        <a href="" className="font-space text-xl font-medium text-white">
                            Facebook
                        </a>
                        <span className="font-space text-xl font-medium text-white">|</span>
                        <a href="" className="font-space text-xl font-medium text-white">
                            Youtube
                        </a>
                        <span className="font-space text-xl font-medium text-white">|</span>
                        <a href="" className="font-space text-xl font-medium text-white">
                            Tiktok
                        </a>
                    </div>
                </div>

                {/* TRIGGER CLOSE */}
                <button
                    onClick={handleMenuToggle}
                    className="absolute top-8 right-12 cursor-pointer text-5xl text-white transition-colors hover:text-gray-300"
                >
                    X
                </button>
            </div>
        </>
    );
}
