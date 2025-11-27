import { ButtonProps } from '@/types';
import { PlayIcon } from '@heroicons/react/24/outline';

export default function Button({ children }: ButtonProps) {
    return (
        <button className="group relative flex flex-row items-center justify-center gap-1">
            <div className="relative z-10 flex aspect-square h-14 items-center justify-center rounded-xl bg-[#224efe] text-white transition duration-300 group-hover:bg-[#1BE3F5]">
                <PlayIcon className="h-7 transition duration-300 group-hover:rotate-y-[360deg]" />
            </div>
            <div className="font-space relative z-10 flex h-14 cursor-pointer flex-col items-center justify-start overflow-hidden rounded-xl bg-[#1B46F5] px-8 text-lg text-white transition duration-300 group-hover:bg-[#1BE3F5]">
                <span className="relative flex min-h-14 items-center justify-center transition duration-300 group-hover:-translate-y-full">
                    {children}
                </span>
                <span className="relative flex min-h-14 items-center justify-center transition duration-300 group-hover:-translate-y-full">
                    {children}
                </span>
            </div>
            ;<div className="absolute z-0 h-6 w-[80%] bg-[#1B46F5] transition duration-300 group-hover:bg-[#1BE3F5]"></div>
        </button>
    );
}
