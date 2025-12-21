export default function MentorCard() {
    return (
        <div className="relative flex aspect-[4/5] w-full items-end justify-start overflow-hidden rounded-lg bg-gray-900">
            {/* CARD IMAGE */}
            <div className="relative h-full w-full overflow-hidden">
                <img
                    src="/assets/mentors/placeholder-nmj.webp"
                    alt="mentor bali startup camp 2025"
                    className="h-full w-full object-cover grayscale"
                />
            </div>
            {/* CARD TITLE */}
            <div className="absolute bottom-0 left-0 flex w-full flex-col items-start justify-start gap-1 bg-[#101010]/10 px-6 py-8 sm:px-7 sm:py-9 md:px-8 md:py-10">
                <h3 className="font-space text-xl font-medium text-white md:text-2xl">Special Guest</h3>
                <p className="font-space text-sm text-white opacity-60 sm:text-base md:text-lg">Startup Founder</p>
            </div>
        </div>
    );
}
