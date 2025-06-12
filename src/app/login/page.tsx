'use client';

import React, {useState} from 'react';
import {Label} from '@/components/ui/label';
import Link from 'next/link';
import {Input} from "@/components/input";
import {Button} from "@/components/ui/button";
import {EyeIcon, EyeOffIcon} from '@/src/components/icons/EyeIcons';
import {convertDigitsToEnglish} from "@/core/utils/convertDigitsToEnglish";
import {useLoginMutation} from "@/features/auth/api/login/hook"; // Corrected import to use the hook

export default function LoginPage() {
    const [apiError, setApiError] = useState(''); // State for API-related errors
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // React Query mutation hook
    const loginMutation = useLoginMutation({
        onError: (error) => {
            // This callback will be called if the mutation fails
            let errorMessage = 'خطا در ورود به حساب کاربری';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setApiError(errorMessage);
        },
        onSettled: () => {
            // This callback will be called regardless of success or failure
            // You might want to clear loading states or perform other actions here
        }
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(''); // Clear previous API errors

        const formData = new FormData(e.target as HTMLFormElement);

        const username = convertDigitsToEnglish(formData.get("userName") as string);
        const password = convertDigitsToEnglish(formData.get("password") as string);

        // Trigger the mutation with the collected data
        if ( username && password){
            loginMutation.mutate({username, password});
        }
    };

    return (
        <div className="flex flex-col h-full px-4 py-8 justify-between">
            {/* Header Section - Top */}
            <div className="text-right w-full max-w-md mx-auto mt-24">
                <h1 className="text-2xl font-semibold">ورود به حساب</h1>
                <p className="text-muted-foreground mt-2">ایمیل و رمز عبور خود را وارد کنید</p>
            </div>

            {/* Form Content Section - Middle, takes available space */}
            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto">
                <div className="w-full">
                    <form id="login-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="userName">شماره تلفن</Label>
                            <Input
                                id="userName"
                                name="userName"
                                type="text"
                                required
                                placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">رمز عبور</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="********"
                                    className="pr-10"
                                    dir="ltr"
                                />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    {showPassword ? (
                                        <EyeOffIcon onClick={togglePasswordVisibility}
                                                    className="size-5 text-gray-500"/>
                                    ) : (
                                        <EyeIcon onClick={togglePasswordVisibility} className="size-5 text-gray-500"/>
                                    )}
                                </span>
                            </div>
                            <Link href="/forgot-password"
                                  className="text-sm text-primary hover:underline mt-2 block text-left">
                                رمز عبور خود را فراموش کرده‌اید؟
                            </Link>
                        </div>
                        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
                    </form>
                </div>
            </div>

            {/* Combined Button and Register Link Section - Very Bottom */}
            <div className="w-full max-w-md mx-auto flex flex-col items-center">
                <Button type="submit" form="login-form" className="w-full" disabled={loginMutation.isPending}
                        variant="default">
                    {loginMutation.isPending ? 'در حال ورود...' : 'ورود'}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                    حساب کاربری ندارید؟{' '}
                    <Link href="/register" className="text-primary hover:underline">
                        ثبت نام کنید
                    </Link>
                </p>
            </div>
        </div>
    );
}
