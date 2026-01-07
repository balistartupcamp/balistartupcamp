import { Briefcase, ChevronRight, Globe, Instagram, MessageCircle, Youtube } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
    {
        id: 1,
        title: 'Pendaftaran Peserta',
        icon: Briefcase,
        href: 'https://s.id/PendaftaranBSC25',
        highlighted: true,
    },
    {
        id: 2,
        title: 'Form Pembayaran',
        icon: Briefcase,
        href: 'https://s.id/FormPembayaranBSC',
    },
    {
        id: 3,
        title: 'Guidebook BSC',
        subtitle: 'Panduan dan Informasi Lengkap',
        icon: Globe,
        href: 'https://s.id/GuidebookBSC25',
    },
    {
        id: 4,
        title: 'Official Website',
        subtitle: 'www.balistartucamp.com',
        icon: Globe,
        href: 'https://balistartupcamp.com',
    },
    {
        id: 5,
        title: 'Youtube Bali Startup Camp',
        subtitle: 'Aftermovie & Highlight',
        icon: Youtube,
        href: 'https://www.youtube.com/@balistartupcamp4465',
    },
    {
        id: 6,
        title: 'Hubungi WhatsApp',
        subtitle: 'Admin Support 24/7',
        icon: MessageCircle,
        href: 'https://wa.me/6282147078126',
    },
];

export default function LinksPage() {
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
            {/* Gradient overlay for depth */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-slate-950/50" />

            {/* Content Container */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo Section */}
                    <div className="mb-8 flex justify-center">
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl">
                            <div className="text-center">
                                <img src="/assets/images/logo-links.png" alt="logo bali startup camp 2025" />
                            </div>
                        </div>
                    </div>

                    {/* Title and Subtitle */}
                    <div className="space-y-2 text-center">
                        <h1 className="font-space text-4xl font-bold tracking-tight text-white md:text-5xl">Bali Startup Camp 2025</h1>
                        <p className="font-space text-lg text-gray-300">First Step to Real Impact</p>
                    </div>

                    {/* Instagram Icon */}
                    <div className="flex justify-center">
                        <a
                            href="https://www.instagram.com/bali.startup/"
                            className="text-gray-400 transition-colors hover:text-white"
                            aria-label="Instagram"
                        >
                            <Instagram size={24} />
                        </a>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-3">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            const isHighlighted = item.highlighted;

                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`group relative flex items-center gap-4 rounded-xl px-6 py-4 transition-all duration-300 ${
                                        isHighlighted
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 hover:from-blue-700 hover:to-blue-800'
                                            : 'border border-slate-700/30 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600/50 hover:bg-slate-700/60'
                                    }`}
                                >
                                    {/* Icon */}
                                    <IconComponent
                                        size={24}
                                        className={`flex-shrink-0 transition-colors ${
                                            isHighlighted ? 'text-white' : 'text-gray-300 group-hover:text-white'
                                        }`}
                                    />

                                    {/* Text Content */}
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className={`font-space text-base font-semibold transition-colors ${isHighlighted ? 'text-white' : 'text-gray-100'}`}
                                        >
                                            {item.title}
                                        </p>
                                        {item.subtitle && (
                                            <p
                                                className={`font-space text-sm transition-colors ${
                                                    isHighlighted ? 'text-blue-100' : 'text-gray-400 group-hover:text-gray-300'
                                                }`}
                                            >
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    {/* Arrow Icon */}
                                    <ChevronRight
                                        size={20}
                                        className={`flex-shrink-0 transition-all duration-300 ${
                                            hoveredItem === item.id ? 'translate-x-1 opacity-100' : 'opacity-70'
                                        } ${isHighlighted ? 'text-white' : 'text-gray-400'}`}
                                    />
                                </a>
                            );
                        })}
                    </div>
                    <p className="font-space text-center text-sm font-normal text-white opacity-40">
                        © 2026 Bali Startup Camp. Powered by Divisi Acara.
                    </p>
                </div>
            </div>

            {/* Decorative blurred shapes for premium feel */}
            <div className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-slate-600/10 blur-3xl" />
        </main>
    );
}
