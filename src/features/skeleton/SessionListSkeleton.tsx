import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card'; // Removed CardDescription import
import {Skeleton} from "@/components/skeleton";

export const SessionListSkeleton: React.FC = () => {
    return (
        <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
                <Card key={index} className="w-full rounded-xl overflow-hidden py-3 my-3" style={{ backgroundColor: '#F1F3F7' }}>
                    <CardHeader className="relative py-2">
                        <CardTitle className="flex justify-between items-start">
                            <div className="flex items-center gap-1">
                                <Skeleton className="w-5 h-5 rounded-full" />
                                <Skeleton className="w-32 h-5" />
                            </div>
                            <Skeleton className="w-5 h-5 rounded-full" />
                        </CardTitle>
                        {/* Replaced CardDescription with a div to avoid p > div nesting */}
                        <div className="text-sm text-muted-foreground">
                            <Skeleton className="w-full h-4 mt-2" />
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
};
