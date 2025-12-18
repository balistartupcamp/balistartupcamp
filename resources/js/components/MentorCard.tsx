export default function MentorCard() {
    return (
        <div className="relative flex aspect-[4/5] w-full items-end justify-start overflow-hidden rounded-lg bg-gray-900">
            {/* CARD IMAGE */}
            <div className="relative h-full w-full overflow-hidden">
                <img src="/assets/mentors/mentor_img_3.webp" alt="mentor bali startup camp 2025" className="h-full w-full object-cover grayscale" />
            </div>
            {/* CARD TITLE */}
            <div className="absolute bottom-0 left-0 flex w-full flex-col items-start justify-start gap-1 bg-[#101010]/10 px-8 py-10">
                <h3 className="font-space text-2xl text-white">Made Suparsana</h3>
                <p className="font-space text-lg text-white opacity-60">Founder Panak.id</p>
            </div>
        </div>
    );
}
