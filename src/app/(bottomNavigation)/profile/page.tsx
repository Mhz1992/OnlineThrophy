'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/drawer';

export default function ProfilePage() {
    const router = useRouter();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const [isNotificationUpdating, setIsNotificationUpdating] = useState(false);
    const [isLogoutDrawerOpen, setIsLogoutDrawerOpen] = useState(false);
    const [loadingLogout, setLoadingLogout] = useState(false);
    const [isSupportDrawerOpen, setIsSupportDrawerOpen] = useState(false); // New state for support drawer

    const SUPPORT_PHONE_NUMBER = '02112345678'; // Example support phone number

    const handleLogout = () => {
        setIsLogoutDrawerOpen(true);
    };

    const handleConfirmLogout = () => {
        setLoadingLogout(true);
        // Simulate API call or actual logout process
        setTimeout(() => {
            console.log('User logged out');
            // In a real application, you would clear tokens, session, etc.
            router.push('/login');
            setLoadingLogout(false);
            setIsLogoutDrawerOpen(false);
        }, 1000);
    };

    const handleNotificationToggle = async (checked: boolean) => {
        setIsNotificationUpdating(true);
        setIsNotificationsEnabled(checked);

        try {
            // Simulate an API call to update user preferences
            await new Promise(resolve => setTimeout(resolve, 500));

            toast.success(`${ checked ? 'اعلان‌ها فعال شدند.' : 'اعلان‌ها غیرفعال شدند.'}`)
        } catch (error) {
            console.error('Failed to update notification settings:', error);
            setIsNotificationsEnabled(!checked);
            toast.error("خطا در به‌روزرسانی تنظیمات اعلان.")
        } finally {
            setIsNotificationUpdating(false);
        }
    };

    const handleOpenSupportDrawer = () => {
        setIsSupportDrawerOpen(true);
    };

    const handleCallSupport = () => {
        window.location.href = `tel:${SUPPORT_PHONE_NUMBER}`;
        setIsSupportDrawerOpen(false); // Close drawer after initiating call
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900 px-4 py-8 justify-between ">
            {/* Header Section - Top */}
            <div className="text-right w-full mx-auto mt-8">
                <h1 className="text-2xl font-semibold">حساب کاربری</h1>
                <p className="text-muted-foreground mt-2">مدیریت اطلاعات و تنظیمات حساب کاربری شما.</p>
            </div>

            {/* Options Section - Middle, takes available space */}
            {/* Removed space-y-4 from this parent div */}
            <div className="flex-grow flex flex-col items-center justify-start w-full  mx-auto mt-8">
                {/* Edit Profile */}
                <Link href="/profile/edit" className="w-full">
                    <div className={cn(
                        "flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700", // Changed styling
                        "hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                    )}>
                        <span className="text-lg font-medium">ویرایش پروفایل</span>
                        {/* Changed arrow direction */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </Link>

                {/* Modify Password */}
                <Link href="/profile/change-password" className="w-full">
                    <div className={cn(
                        "flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700", // Changed styling
                        "hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                    )}>
                        <span className="text-lg font-medium">تغییر رمز عبور</span>
                        {/* Changed arrow direction */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </Link>

                {/* Support Option */}
                <div
                    onClick={handleOpenSupportDrawer}
                    className={cn(
                        "w-full flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700", // Changed styling
                        "hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                    )}
                >
                    <span className="text-lg font-medium">پشتیبانی</span>
                    {/* Changed arrow direction */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Notification Toggle */}
                <div className="w-full py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                    <Label htmlFor="notifications-toggle" className="text-lg font-medium cursor-pointer">
                        فعال‌سازی اعلان‌ها
                    </Label>
                    <Switch
                        id="notifications-toggle"
                        checked={isNotificationsEnabled}
                        onCheckedChange={handleNotificationToggle}
                        disabled={isNotificationUpdating}
                    />
                </div>
            </div>

            {/* Exit Button - Very Bottom */}
            <div className="w-full max-w-md mx-auto mt-auto mb-4"> {/* Changed p-4 to mb-4 */}
                <Button onClick={handleLogout} className="w-full" variant="destructive">
                    خروج از حساب کاربری
                </Button>
            </div>

            {/* Logout Confirmation Drawer */}
            <Drawer open={isLogoutDrawerOpen} onOpenChange={setIsLogoutDrawerOpen}>
                <DrawerContent className="rounded-t-[30px] rounded-b-none">
                    <DrawerHeader>
                        <DrawerTitle>تایید خروج</DrawerTitle>
                        <DrawerDescription>
                            آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button onClick={handleConfirmLogout} disabled={loadingLogout}>
                            {loadingLogout ? 'در حال خروج...' : 'بله، خارج شوم'}
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline" disabled={loadingLogout}>
                                <span>لغو</span>
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* Support Drawer */}
            <Drawer open={isSupportDrawerOpen} onOpenChange={setIsSupportDrawerOpen}>
                <DrawerContent className="rounded-t-[30px] rounded-b-none">
                    <DrawerHeader>
                        <DrawerTitle>تماس با پشتیبانی</DrawerTitle>
                        <DrawerDescription>
                            برای ارتباط با تیم پشتیبانی، روی شماره زیر کلیک کنید.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        <div
                            onClick={handleCallSupport}
                            className={cn(
                                "flex items-center justify-center p-4 bg-primary text-primary-foreground rounded-lg shadow-md cursor-pointer",
                                "hover:bg-primary/90 transition-colors"
                            )}
                        >
                            <span className="text-2xl font-bold tracking-wide">{SUPPORT_PHONE_NUMBER}</span>
                        </div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">
                                <span>بستن</span>
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
