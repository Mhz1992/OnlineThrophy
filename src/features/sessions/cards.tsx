'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { BookOpen2Icon, EyeIcon, KeyIcon, LockIcon } from "@/features/common/assets/svg";
import { cn } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionStatus } from '@/types/api';
import { toast } from 'sonner';

interface SessionCardProps {
    title: string;
    description: string;
    link: string;
    status: SessionStatus;
}

export const SessionCard: React.FC<SessionCardProps> = ({ title, description, link, status }) => {
    const router = useRouter();

    const StatusIcon = () => {
        switch (status) {
            case 'open':
                return <KeyIcon className={cn("w-5 h-5 text-primary")} />;
            case 'locked':
                return <LockIcon className={cn("w-5 h-5 text-black dark:text-white")} />;
            case 'viewed':
                return (
                    <div className={"flex gap-1"}>
                        <EyeIcon className={cn("w-5 h-5 text-primary")} />
                        <KeyIcon className={cn("w-5 h-5 text-primary")} />
                    </div>
                );
            default:
                return null;
        }
    };

    const handleClick = () => {
        if (status === 'locked') {
            toast.info("این جلسه ممکن است با گذراندن آزمون‌ها باز شود.");
        } else {
            router.push(link);
        }
    };

    return (
        <div onClick={handleClick} className="cursor-pointer">
            <Card
                className="w-full rounded-xl overflow-hidden hover:bg-accent hover:text-accent-foreground transition-colors py-3 my-3"
                style={{ backgroundColor: '#F1F3F7' }}
            >
                <CardHeader className="relative py-2">
                    <CardTitle className="flex justify-between items-start text-primary">
                        <div id="2" className="flex items-center gap-1">
                            <BookOpen2Icon className="w-5 h-5" />
                            <span>{title}</span>
                        </div>

                        <div id="1" className={cn("flex-shrink-0")}>
                            <StatusIcon />
                        </div>
                    </CardTitle>

                    <CardDescription className="text-gray-400 dark:text-gray-200">
                        {description}
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};
