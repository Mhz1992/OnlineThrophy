'use client';

import React from "react";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/skeleton";
import Link from "next/link";
import {ArrowLeftIcon} from "@/features/common/assets/svg";

interface StartExamCardProps {
    exam_id: string;
    isLoading?: boolean;
}

export const StartExamCard: React.FC<StartExamCardProps> = ({ exam_id , isLoading }) => {

    return(
        <div className="w-full h-10 px-4 ">
            {isLoading ? (
                <Card className="w-full rounded-[20px] relative overflow-hidden -top-10">
                    <CardHeader>
                        <Skeleton className="w-48 h-5 "/>
                    </CardHeader>
                </Card>
            ) : exam_id ? (
                <Card className="w-full rounded-[20px] relative overflow-hidden -top-10 bg-[#F2FAFF]">
                    <CardHeader>
                        <CardTitle className="w-full">
                            <Link
                                href={`/exams/${exam_id}`}
                                className="flex items-center justify-between w-full"
                                passHref
                            >
                                <span>شروع آزمون اصلی</span>
                                <ArrowLeftIcon height={12} width={12} className="text-black"/>
                            </Link>
                        </CardTitle>
                    </CardHeader>
                </Card>
            ): (
                <Card className="w-full rounded-[20px] relative overflow-hidden -top-10 bg-[#F2FAFF]">
                    <CardHeader>
                        <CardTitle className="w-full disabled">
                                <span>شروع آزمون اصلی</span>
                                <ArrowLeftIcon height={12} width={12} className="text-black"/>
                        </CardTitle>
                    </CardHeader>
                </Card>
            )}

        </div>
    );
};
