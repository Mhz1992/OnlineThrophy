import React from 'react';
import { Skeleton } from '@/components/skeleton'; // Assuming you have a Skeleton component

export const ExamQuestionSkeleton: React.FC = () => {
    return (
        <div className="w-full">
            <div className="mb-4 text-left text-sm">
                <Skeleton className="w-16 h-4" />
            </div>
            <h3 className="text-lg font-semibold mb-6 text-right">
                <Skeleton className="w-3/4 h-6" />
            </h3>

            <h4 className="font-bold text-right mb-4">
                <Skeleton className="w-48 h-5" />
            </h4>

            <div className="space-y-3 mb-8">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-full justify-start text-right py-3 px-4 rounded-lg border bg-gray-100 dark:bg-gray-700 flex items-center">
                        <Skeleton className="ml-2 w-6 h-6 rounded-full" />
                        <Skeleton className="flex-1 h-5" />
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <Skeleton className="w-full h-10 rounded-md" />
            </div>
        </div>
    );
};
