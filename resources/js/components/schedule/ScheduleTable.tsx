import { ReactNode } from 'react';

export default function ScheduleTable({ children }: { children: ReactNode }) {
    return <div className="mt-8 flex w-full flex-col items-start justify-start gap-4">{children}</div>;
}
