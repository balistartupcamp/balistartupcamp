import { ShceduleTableItemProps } from '@/types';

export default function ScheduleTableItem({ time, total, title, description }: ShceduleTableItemProps) {
    return (
        <div className="flex w-full flex-row items-start justify-between gap-6 border-t border-white/10 px-4 py-8">
            {/* TIME */}
            <div className="flex flex-1 flex-col justify-start gap-3">
                <h3 className="font-space text-3xl font-medium text-white opacity-85">{time}</h3>
                <p className="font-space text-lg text-white opacity-40">[{total} jam]</p>
            </div>

            {/* DETAIL */}
            <div className="flex flex-1 flex-col items-start justify-start gap-3">
                <h3 className="font-space text-3xl font-medium text-white opacity-85">{title}</h3>
                <p className="font-space text-lg text-white opacity-40">{description}</p>
            </div>
        </div>
    );
}
