'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLIcon, BookOpenIcon, NotificationIcon } from "@/features/common/assets/svg";
import { SessionCard } from "@/features/sessions/cards";
import { NotificationDrawer } from "@/features/drawers/NotificationDrawer";
import { SessionListSkeleton } from '@/features/skeleton/SessionListSkeleton';
import { Exam, TrophySession } from '@/types/api';
import {Skeleton} from "@/components/skeleton";

interface HomeData {
    unfinishedExam: Exam;
    sessions: TrophySession[];
    userName: string;
}

export default function Page() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data, isLoading, isError } = useQuery<HomeData, Error>({
        queryKey: ['homeData'],
        queryFn: async () => {
            const response = await fetch('/api/home');
            if (!response.ok) {
                throw new Error('Failed to fetch home data');
            }
            return response.json();
        },
    });

    const userName = data?.userName || "کاربر";
    const MOCK_UNFINISHED_EXAM = data?.unfinishedExam;
    const MOCK_SESSIONS = data?.sessions || [];

    if (isError) {
        return (
            <div className="flex flex-col h-full items-center justify-center p-4 text-center">
                <h1 className="text-2xl font-bold">خطا در بارگذاری صفحه اصلی!</h1>
                <p className="text-gray-600 mt-2">مشکلی در دریافت اطلاعات پیش آمده است.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div
                className="flex-col relative w-full h-[200px] pt-8 pb-36 bg-primary dark:bg-primary rounded-b-[16px] flex items-right justify-center p-4 text-white">
                <div className="absolute top-4 left-4">
                    <button onClick={() => setIsDrawerOpen(true)} className="  hover:bg-primary-hover">
                        <NotificationIcon className="h-10 w-10 text-white" />
                    </button>
                </div>
                <p className="text-l text-right w-full mb-0 pb-0 mt-10">
                    خوش آمدید!
                </p>
                <h2 className="text-2xl font-bold text-right w-full">
                    {isLoading ? <Skeleton className="w-32 h-8 bg-white/20" /> : userName}
                </h2>
            </div>

            <div className="flex-grow flex flex-col p-4"> {/* Removed overflow-y-auto here */}
                <div className="w-full h-10 ">
                    {isLoading ? (
                        <Card className="w-full rounded-[20px] relative overflow-hidden -top-24">
                            <CardHeader>
                                <Skeleton className="w-48 h-6 mb-2" />
                                <Skeleton className="w-full h-4" />
                            </CardHeader>
                        </Card>
                    ) :  MOCK_UNFINISHED_EXAM && (
                        <Card className="w-full rounded-[20px] relative overflow-hidden -top-24 bg-[#F2FAFF]">
                            <CardHeader>
                                <CardTitle className="w-full">
                                    <Link
                                        href={`/exams/${MOCK_UNFINISHED_EXAM.slug}`}
                                        className="flex items-center justify-between w-full"
                                        passHref
                                    >
                                        <span>شروع آزمون اصلی</span>
                                        <ArrowLIcon height={12} width={12} className="text-gray-500" />
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    )}

                </div>

                <div className="w-full mt-6 relative">
                    <h3 className="text-xl font-semibold text-right mb-4 flex items-center">
                        <BookOpenIcon height={24} width={24} className={cn("mx-3")} />
                        جلسات آموزشی
                    </h3>
                    {isLoading ? (
                        <SessionListSkeleton />
                    ) : (
                        <div className="space-y-4">
                            {MOCK_SESSIONS.map((session) => (
                                <SessionCard
                                    key={session.id}
                                    title={session.title}
                                    link={`/sessions/${session.slug}`}
                                    status={session.status} // Assuming all fetched sessions are 'open' for now
                                    description={session.description}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <NotificationDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
        </div>
    );
}
