export default function SponsorItem({ imageLink, altText }: { imageLink: string; altText: string }) {
    return (
        <div className="flex h-32 w-full flex-col items-center justify-center gap-4 rounded-sm border border-white/10 px-4 py-6 sm:rounded-md md:rounded-lg">
            <img src={'/assets/sponsors/' + imageLink} alt={altText} className="h-full w-full object-contain" />
        </div>
    );
}
