export default function MentorCard() {
    return (
        <div className="relative flex aspect-[4/5] w-full items-end justify-start overflow-hidden rounded-lg bg-gray-900">
            {/* CARD IMAGE */}
            <div className="relative h-full w-full overflow-hidden">
                <img src="/assets/mentors/" alt="mentor bali startup camp 2025" className="h-full w-full object-cover" />
            </div>
            {/* CARD TITLE */}
            <div className="absolute bottom-0 left-0 flex w-full flex-col items-start justify-start gap-1 px-6 py-8">
                <h3 className="font-space text-2xl text-white">Wiradarm Anak</h3>
                <p className="font-space text-lg text-white opacity-60">Founder Webverse</p>
            </div>
        </div>
    );
}
