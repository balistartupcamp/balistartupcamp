export default function MentorCard({ name, image, startup, link }: { name: string; image: string; startup?: string; link?: string }) {
    return (
        <div className="relative flex aspect-[4/5] w-full items-end justify-start overflow-hidden rounded-lg bg-gray-900">
            {/* CARD IMAGE */}
            <div className="relative h-full w-full overflow-hidden">
                <img
                    src={image ? '/assets/nmj/' + image : '/assets/nmj/placeholder-nmj.webp'}
                    alt="mentor bali startup camp 2025"
                    className="h-full w-full object-cover grayscale"
                />
            </div>
            {/* CARD TITLE */}
            <div className="absolute bottom-0 left-0 flex w-full flex-col items-start justify-start gap-1 bg-[#101010]/10 px-6 py-8 sm:px-7 sm:py-9 md:px-8 md:py-10">
                <h3 className="font-space text-xl font-medium text-white md:text-2xl">{name}</h3>
                <a href={link ? link : '/'} className="font-space flex gap-2 text-sm text-white opacity-60 sm:text-base md:text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                        />
                    </svg>
                    {startup ? startup : 'Startup Expert'}
                </a>
            </div>
        </div>
    );
}
