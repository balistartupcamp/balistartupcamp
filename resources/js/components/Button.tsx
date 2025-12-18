import { ButtonProps } from '@/types';
import { PlayIcon } from '@heroicons/react/24/outline';

export default function Button({ children }: ButtonProps) {
    return (
        <button className="group relative flex cursor-pointer flex-row items-center justify-center gap-1">
            <div className="relative z-10 flex aspect-square h-11 items-center justify-center rounded-md bg-[#224efe] text-white transition duration-300 group-hover:bg-[#fff] group-hover:text-[#224efe] group-hover:shadow-2xl sm:h-12 sm:rounded-lg md:h-14 md:rounded-xl">
                <PlayIcon className="h-5 transition duration-300 group-hover:rotate-y-[360deg] sm:h-6 md:h-7" />
            </div>
            <div className="font-space relative z-10 flex h-11 cursor-pointer flex-col items-center justify-start overflow-hidden rounded-md bg-[#1B46F5] px-8 text-sm text-white transition duration-300 group-hover:bg-[#fff] group-hover:shadow-2xl sm:h-12 sm:rounded-lg sm:text-base md:h-14 md:rounded-xl md:text-lg">
                <span className="relative flex min-h-11 items-center justify-center transition duration-300 group-hover:-translate-y-full group-hover:text-[#224efe] sm:min-h-12 md:min-h-14">
                    {children}
                </span>
                <span className="relative flex min-h-11 items-center justify-center transition duration-300 group-hover:-translate-y-full group-hover:text-[#224efe] sm:min-h-12 md:min-h-14">
                    {children}
                </span>
            </div>
            <div className="absolute z-0 h-6 w-[80%] bg-[#1B46F5] transition duration-300 group-hover:bg-[#fff]"></div>
        </button>
    );
}
