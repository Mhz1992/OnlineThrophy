'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {cn} from '@/lib/utils';
import {toast} from 'sonner';
import {LogoutConfirmDrawer} from "@/features/drawers/LogoutConfirmDrawer";
import {CallSupportDrawer} from "@/features/drawers/CallSupportDrawer";
import {ArrowLIcon} from "@/features/common/assets/svg";
import {useLogoutMutation} from "@/features/auth/api/logout";


export default function ProfilePage() {
    const router = useRouter();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const [isNotificationUpdating, setIsNotificationUpdating] = useState(false);
    const [isLogoutDrawerOpen, setIsLogoutDrawerOpen] = useState(false);
    const [loadingLogout, setLoadingLogout] = useState(false);
    const [isSupportDrawerOpen, setIsSupportDrawerOpen] = useState(false); // New state for support drawer

    const SUPPORT_PHONE_NUMBER = '02112345678'; // Example support phone number

    // Initialize the logout mutation
    const logoutMutation = useLogoutMutation({
        onSettled: () => {
            setLoadingLogout(false);
            setIsLogoutDrawerOpen(false);
        }
    });

    const handleLogout = () => {
        setIsLogoutDrawerOpen(true);
    };

    const handleConfirmLogout = () => {
        setLoadingLogout(true);
        // Call the logout API
        const refreshToken =  localStorage.getItem("refreshToken")
        if (refreshToken){
            logoutMutation.mutate({refresh:refreshToken});
        }

    };

    const handleNotificationToggle = async (checked: boolean) => {
        setIsNotificationUpdating(true);
        setIsNotificationsEnabled(checked);

        try {
            // Simulate an API call to update user preferences
            await new Promise(resolve => setTimeout(resolve, 500));

            toast.success(`${checked ? 'اعلان‌ها فعال شدند.' : 'اعلان‌ها غیرفعال شدند.'}`)
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
    const profileItems = [
        {
            id: "1",
            link: "/profile/edit",
            title: "ویرایش پروفایل",
            onClick: () => {
            },
            type: "link"
        },
        {
            id: "2",
            link: "/profile/change-password",
            title: "تغییر رمز عبور",
            onClick: () => {
            },
            type: "link"
        },
        {
            id: "3",
            link: undefined,
            title: "پشتیبانی",
            onClick: handleOpenSupportDrawer,
            type: "link"
        },
        {
            id: "4",
            link: undefined,
            title: "فعال‌سازی اعلان‌ها",
            onClick: () => {
            },
            type: "switch"
        },
    ]
    return (
        <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900 px-4  justify-between ">
            {/* Header Section - Top */}
            <div className="text-right w-full mx-auto mt-8">
                <h1 className="text-2xl font-semibold">حساب کاربری</h1>
                <p className="text-muted-foreground mt-2">مدیریت اطلاعات و تنظیمات حساب کاربری شما.</p>
            </div>

            {/* Options Section - Middle, takes available space */}
            {/* Removed space-y-4 from this parent div */}
            <div className="flex-grow flex flex-col items-center justify-start w-full  mx-auto mt-8">
                {/* Edit Profile */}

                {profileItems.map((item, idx) => {
                    const comp =
                        item.type === "link" ?
                            (<div
                                key={item.id}
                                onClick={item.onClick}
                                className={cn(
                                    "flex items-center justify-between p-4 w-full",
                                    idx === profileItems.length -1 ? "" : " border-b rounded border-gray-200 dark:border-gray-700",
                                    "hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                )}>
                                <span className="text-lg font-medium">{item.title}</span>
                                <ArrowLIcon className={"h-4 w-4 text-muted-foreground"}/>
                            </div>) : item.type === "switch" ? (
                                <div
                                    key={item.id}
                                    className={cn("w-full p-4 flex items-center justify-between ",
                                        idx === profileItems.length -1 ? "" : " border-b border-gray-200 dark:border-gray-700")}>
                                    <Label htmlFor="notifications-toggle" className="text-lg font-medium cursor-pointer">
                                        {item.title}
                                    </Label>
                                    <Switch
                                        id="notifications-toggle"
                                        checked={isNotificationsEnabled}
                                        onCheckedChange={handleNotificationToggle}
                                        disabled={isNotificationUpdating}
                                    />
                                </div>) : null

                    if (item.link && item.type === "link") {
                        return (
                            <Link key={item.id} href={item.link} className="w-full">
                                {comp}
                            </Link>
                        );
                    } else {
                        return comp
                    }
                })}


            </div>

            {/* Exit Button - Very Bottom */}
            <div className="w-full max-w-md mx-auto mt-auto mb-5">
                <Button onClick={handleLogout} className="w-full" variant="destructive">
                    خروج از حساب کاربری
                </Button>
            </div>

            <LogoutConfirmDrawer
                open={isLogoutDrawerOpen}
                onOpenChange={setIsLogoutDrawerOpen}
                onClick={handleConfirmLogout}
                disabled={loadingLogout}
            />

            <CallSupportDrawer
                open={isSupportDrawerOpen}
                onOpenChange={setIsSupportDrawerOpen}
                onClick={handleCallSupport}
                supportphonenumber={SUPPORT_PHONE_NUMBER}
            />
        </div>
    );
}
