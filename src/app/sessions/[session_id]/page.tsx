'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/button';
import {ArrowLIcon} from "@/features/common/assets/svg";
import {SessionContentDisplay} from '@/features/session/components/SessionContentDisplay';
import {cn} from '@/lib/utils';
import {SessionContentSkeleton} from '@/features/skeleton/SessionContentSkeleton';
import {Skeleton} from "@/components/skeleton";
import {useSessionMediaQuery} from "@/features/session/api/hooks";

interface SessionPageProps {
    params: Promise<{
        session_id: string;
    }>;
}

export default function SessionPage({params}: SessionPageProps) {
    const router = useRouter();
    const {session_id} = React.use(params);
    const {data: sessionData, isLoading, isError} = useSessionMediaQuery(session_id)
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <h1 className="text-2xl font-bold">خطا در بارگذاری جلسه!</h1>
                <p className="text-gray-600 mt-2">متاسفانه مشکلی در دریافت محتوای جلسه پیش آمده است.</p>
                <Button onClick={() => router.back()} className="mt-4">
                    بازگشت
                </Button>
            </div>
        );
    }
    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-bold text-right">{isLoading ?
                    <Skeleton className="w-48 h-6"/> : sessionData?.title}</h1>
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-primary dark:text-primary-foreground"
                >
                    <span>خروج</span>
                    <ArrowLIcon height={20} width={20} className={cn("text-primary dark:text-primary-foreground")}/>
                </Button>
            </header>

            <main className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <SessionContentSkeleton/>
                ) : sessionData ? (
                    <SessionContentDisplay media={sessionData?.media}/>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                        <h1 className="text-2xl font-bold">جلسه یافت نشد!</h1>
                        <p className="text-gray-600 mt-2">متاسفانه محتوای مورد نظر شما در دسترس نیست.</p>
                        <Button onClick={() => router.back()} className="mt-4">
                            بازگشت
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}
