import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/skeleton'; // Assuming you have a Skeleton component

export const SessionContentSkeleton: React.FC = () => {
    return (
        <div className="space-y-6 py-4">
            {/* Video Placeholder */}
            <div className="flex flex-col items-center">
                <Skeleton className="w-3/4 h-6 mb-4" />
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <Skeleton className="absolute top-0 left-0 w-full h-full rounded-lg" />
                </div>
            </div>

            {/* Text Card Placeholder */}
            <Card className="w-full rounded-lg shadow-md" style={{ backgroundColor: '#F2F2F2' }}>
                <CardHeader>
                    <Skeleton className="w-1/2 h-6" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="w-full h-4 mb-2" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-3/4 h-4" />
                </CardContent>
            </Card>

            {/* Audio Player Placeholder */}
            <Card className="w-full rounded-lg shadow-md" style={{ backgroundColor: '#F2F2F2' }}>
                <CardHeader>
                    <Skeleton className="w-2/3 h-6" />
                </CardHeader>
                <CardContent className="flex items-center mx-0">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="flex-1 mx-4 h-[60px] rounded-lg" />
                </CardContent>
            </Card>

            {/* Another Text Card Placeholder */}
            <Card className="w-full rounded-lg shadow-md" style={{ backgroundColor: '#F2F2F2' }}>
                <CardHeader>
                    <Skeleton className="w-1/2 h-6" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="w-full h-4 mb-2" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-3/4 h-4" />
                </CardContent>
            </Card>
        </div>
    );
};
