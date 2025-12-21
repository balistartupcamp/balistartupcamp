import { ShceduleTableItemProps } from '@/types';

export default function ScheduleTableItem({ time, total, title, description }: ShceduleTableItemProps) {
    return (
        <div className="flex w-full flex-col items-start justify-between gap-4 border-t border-white/10 px-2 py-4 sm:flex-row sm:gap-6 sm:px-3 sm:py-6 md:px-4 md:py-8">
            {/* TIME */}
            <div className="flex flex-1 flex-row items-center justify-start gap-1 sm:flex-col sm:items-start sm:gap-3">
                <h3 className="font-space text-xl font-medium text-white opacity-85 sm:text-2xl md:text-3xl">{time}</h3>
                <p className="font-space text-sm text-white opacity-40 sm:text-base md:text-lg">[{total}]</p>
            </div>

            {/* DETAIL */}
            <div className="flex flex-1 flex-col items-start justify-start gap-1 sm:gap-3">
                <h3 className="font-space text-xl font-medium text-white opacity-85 sm:text-2xl md:text-3xl">{title}</h3>
                <p className="font-space text-sm text-white opacity-40 sm:text-base md:text-lg">{description}</p>
            </div>
        </div>
    );
}
