'use client';

import React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/drawer";
import {Button} from "@/components/button";


interface NotificationDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const notifications = [
    {id: 1, message: "شما یک پیام جدید از پشتیبانی دارید."},
    {id: 2, message: "نتایج آزمون شما آماده است."},
    {id: 3, message: "یادآوری: جلسه 'ری‌اکت پیشرفته' تا ۱ ساعت دیگر شروع می‌شود."},
    {id: 4, message: "دوره جدید 'مبانی نکست.جی‌اس' اکنون در دسترس است."},
    {id: 5, message: "اشتراک شما به زودی منقضی می‌شود."},
    {id: 6, message: "ویژگی‌های جدید ما را از دست ندهید!"},
];

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({open, onOpenChange}) => {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader className="text-right">
                    <DrawerTitle className={"text-right"}
                    >اعلانات</DrawerTitle>
                    <DrawerDescription className={
                        'text-right'
                    }>آخرین به‌روزرسانی‌ها و هشدارها.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 overflow-y-auto max-h-[70vh]">
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <div key={notification.id}>
                                <p className="py-2 text-sm text-gray-800 dark:text-gray-200 text-right">{notification.message}</p>
                                {index < notifications.length - 1 && (
                                    <div className="border-b border-gray-200 dark:border-gray-700 my-2"/>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className=" text-gray-500 dark:text-gray-400 text-right">اعلانی برای نمایش وجود ندارد.</p>
                    )}
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline" asChild>
                            بستن
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
