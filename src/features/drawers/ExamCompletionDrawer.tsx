'use client';

import React from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from '@/components/drawer';
import {Button} from '@/components/button';
import finishedExam from '@/src/features/common/assets/images/finish-exam.png'
import {cn} from "@/lib/utils";

interface ExamCompletionDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ExamCompletionDrawer: React.FC<ExamCompletionDrawerProps> = ({open, onOpenChange}) => {
    const router = useRouter();

    const handleReturnToHome = () => {
        onOpenChange(false);
        router.push('/');
    };

    return (
        <div className={cn("max-w-3xl")}>
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <div className="p-4 flex justify-center items-center">
                        <Image
                            src={finishedExam}
                            alt="Exam Finished"
                            width={300}
                            height={300}
                            className="object-contain"
                        />
                    </div>
                    <DrawerHeader className="text-center">
                        <DrawerTitle className="text-2xl font-bold text-primary text-center">آزمون به پایان
                            رسید</DrawerTitle>
                        <DrawerDescription className="text-gray-600 text-center">
                            نتایج شما به زودی در دسترس خواهد بود
                        </DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="default" onClick={handleReturnToHome}>
                                بازگشت به صفحه اصلی
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};
