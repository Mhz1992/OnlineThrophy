'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Label} from '@/components/ui/label';
import Link from 'next/link';
import {Input} from "@/components/input";
import {Button} from "@/components/ui/button";
import {EyeIcon, EyeOffIcon} from '@/src/components/icons/EyeIcons';
import {convertDigitsToEnglish} from "@/core/utils/convertDigitsToEnglish";
import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';
import { apiClient } from '@/src/lib/apiClient'; // Import the new apiClient

export default function LoginPage() {
    const [apiError, setApiError] = useState(''); // State for API-related errors
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Function to perform the login API call using apiClient
    const loginUserApi = async (credentials: { username: string; password: string }) => {
        // Pass isAuthRequest: true because this is the login call itself, no token needed yet
        return apiClient<{ success: boolean; message: string; data: string; status: string; dateTime: string }>('/auth/login', {
            method: 'POST',
            body: credentials,
            isAuthRequest: true, // Mark as an auth request so no token is sent with this request
        });
    };

    // React Query mutation hook
    const loginMutation = useMutation({
        mutationFn: loginUserApi,
        onSuccess: async (response) => { // Made async to await cookie setting
            // Save the token to localStorage upon successful login
            if (response.success && response.data) {
                localStorage.setItem('authToken', response.data); // Save the token

                // Call the new API route to set the HTTP-only cookie
                try {
                    await fetch('/api/auth/set-token-cookie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: response.data }),
                    });
                } catch (cookieError) {
                    console.error('Failed to set token cookie:', cookieError);
                    // Handle this error if necessary, but usually not critical for user flow
                }

                toast.success(response.message || 'ورود موفقیت‌آمیز بود');
                router.push('/'); // Redirect to home page
            } else {
                // Handle cases where success is false but response is still OK (e.g., custom API errors)
                setApiError(response.message || 'ورود ناموفق بود');
                toast.error(response.message || 'ورود ناموفق بود');
            }
        },
        onError: (err: Error) => {
            setApiError(err.message); // Set the API error message to local state
            toast.error(err.message); // Show a toast notification
        },
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
