import { ReactNode } from 'react';

export default function ScheduleTableHead({ children }: { children: ReactNode }) {
    return (
        <div className="font-space w-full rounded-xl border border-dashed border-gray-700 bg-gray-800 px-6 py-4 text-xl font-semibold text-white">
            {children}
        </div>
    );
}
