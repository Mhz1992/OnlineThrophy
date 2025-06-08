'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from '@/src/components/icons/EyeIcons';
import {convertDigitsToEnglish} from "@/core/utils/convertDigitsToEnglish"; // Import from new file


export default function LoginPage() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const userName = convertDigitsToEnglish(formData.get("userName") as string);
        const password = convertDigitsToEnglish(formData.get("password") as string);
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, password }),
            });

            if (response.ok) {
                router.push('/');
            } else {
                const data = await response.json();
                setError(data.message || 'ورود ناموفق بود');
            }
        } catch (err) {
            setError('خطای غیرمنتظره‌ای رخ داد. لطفا دوباره تلاش کنید.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full px-4 py-8 justify-between"> {/* Removed min-h-screen and bg classes */}
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
                            <Label htmlFor="userNmae">شماره تلفن</Label>
                            <Input
                                id="userNmae"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="********"
                                    className="pr-10" // Add padding for the icon
                                    dir="ltr" // Set direction to LTR
                                />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    {showPassword ? (
                                        <EyeOffIcon onClick={togglePasswordVisibility} className="size-5 text-gray-500" />
                                    ) : (
                                        <EyeIcon onClick={togglePasswordVisibility} className="size-5 text-gray-500" />
                                    )}
                                </span>
                            </div>
                            <Link href="/forgot-password" className="text-sm text-primary hover:underline mt-2 block text-left">
                                رمز عبور خود را فراموش کرده‌اید؟
                            </Link>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </div>
            </div>

            {/* Combined Button and Register Link Section - Very Bottom */}
            <div className="w-full max-w-md mx-auto flex flex-col items-center">
                <Button type="submit" form="login-form" className="w-full" disabled={loading} variant="default">
                    {loading ? 'در حال ورود...' : 'ورود'}
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
