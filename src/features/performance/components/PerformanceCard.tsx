import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {toPersianNumber} from "@/lib/utils";

interface PerformanceCardProps {
    title: string;
    score: number;
    timestamp: number; // Epoch time in milliseconds
}

// Helper function to format timestamp to Persian date
const formatPersianDate = (timestamp: number) => {
    const date = new Date(timestamp);
    // Using 'fa-IR' locale for Persian numbers and month names
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat('fa-IR', options).format(date);
};

export const PerformanceCard: React.FC<PerformanceCardProps> = ({ title, score, timestamp }) => {
    return (
        <Card className="my-2 bg-transparent">
            <CardHeader className="space-y-0 pb-2"> {/* CardHeader now only for title and date */}
                {/* First row: Title and Date */}
                <div className="flex items-baseline gap-2 justify-between"> {/* Adjusted to justify-end for RTL title */}
                    <CardTitle className="text-right text-md">
                        {title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {formatPersianDate(timestamp)}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="pt-0"> {/* CardContent for the score row */}
                {/* Second row: Score label on right, score number on left, full width */}
                <div className="flex w-full justify-between items-center">
                    <p className="text-sm text-muted-foreground">امتیاز:</p>
                    <CardTitle className="text-lg font-bold text-primary">
                        {toPersianNumber(score)}
                    </CardTitle>
                </div>
            </CardContent>
        </Card>
    );
};
