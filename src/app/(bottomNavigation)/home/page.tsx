'use client';

import React, {useState} from 'react';
import {NotificationIcon} from "@/features/common/assets/svg";
import {NotificationDrawer} from "@/features/drawers/NotificationDrawer";
import {Skeleton} from "@/components/skeleton";
import {TherapySessionSection} from "@/features/home/components/TherapySessionSection";
import {useHomeQuery} from "@/features/home/api/hooks";
import {StartExamCard} from "@/features/home/components/ExamCard";

export default function HomePage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    const {data: homeData, isLoading, isError} = useHomeQuery()

    const userName = homeData?.full_name
    const userSessions = homeData?.active_therapy_sessions;
    const examId = homeData?.exam_id;

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
                        <NotificationIcon className="h-10 w-10 text-white"/>
                    </button>
                </div>
                <p className="text-l text-right w-full mb-0 pb-0 mt-10">
                    خوش آمدید!
                </p>
                <h2 className="text-2xl font-bold text-right w-full">
                    {isLoading ? <Skeleton className="w-32 h-8 bg-white/20"/> : userName}
                </h2>
            </div>

            <div className="flex-grow flex flex-col "> {/* Removed overflow-y-auto here */}
                {examId && <StartExamCard exam_id={examId} isLoading={isLoading}/>}

                {userSessions && userSessions.length != 0 ? (
                        <TherapySessionSection isLoading={isLoading} therapySessions={userSessions}/>) :
                    <h3 className="text-xl font-semibold text-center m-auto items-center">
                        جلسه‌ای برای شما وجود ندارد.
                        <br/>
                        <br/>
                        <small> لطفا آزمون اول را شرکت نمایید تا جلسات با توجه به نتایج شما نمایش داده شود.
                        </small>
                    </h3>
                }
            </div>

            <NotificationDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}/>
        </div>
    );
}
