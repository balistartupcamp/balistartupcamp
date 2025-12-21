import { ReactNode } from 'react';

export default function ScheduleTableHead({ children }: { children: ReactNode }) {
    return (
        <div className="font-space w-full rounded-md border border-dashed border-gray-700 bg-gray-800 px-6 py-4 text-base font-semibold text-white sm:rounded-lg sm:text-lg md:rounded-xl md:text-xl">
            {children}
        </div>
    );
}
