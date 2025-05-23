'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Placeholder for API call to send password reset code
        try {
            // In a real application, you would call an API endpoint here
            // e.g., /api/auth/forgot-password or /api/auth/send-reset-code
            // const response = await fetch('/api/auth/forgot-password', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ phone }),
            // });

            // if (response.ok) {
            //     // Redirect to a page where user can enter the code and new password
            //     router.push(`/reset-password?phone=${phone}`);
            // } else {
            //     const data = await response.json();
            //     setError(data.message || 'ارسال کد ناموفق بود');
            // }

            // Simulate API call success
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('کد بازیابی به شماره شما ارسال شد.'); // Translated: Recovery code sent to your number
            router.push(`/reset-password?phone=${phone}`); // Redirect to a reset password page

        } catch (err) {
            setError('خطای غیرمنتظره‌ای رخ داد. لطفا دوباره تلاش کنید.'); // Translated: An unexpected error occurred. Please try again.
            console.error('Forgot password error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 justify-between">
            {/* Header Section - Top */}
            <div className="text-right w-full max-w-md mx-auto mt-24">
                <h1 className="text-2xl font-semibold">بازیابی رمز عبور</h1> {/* Translated: Password Recovery */}
                <p className="text-muted-foreground mt-2">شماره تلفن خود را وارد کنید تا کد بازیابی برای شما ارسال شود.</p> {/* Translated: Enter your phone number to receive a recovery code. */}
            </div>

            {/* Form Content Section - Middle, takes available space */}
            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto">
                <div className="w-full">
                    <form id="forgot-password-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="phone">شماره تلفن</Label> {/* Translated: Phone Number */}
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹" /* Translated */
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </div>
            </div>

            {/* Combined Button and Login Link Section - Very Bottom */}
            <div className="w-full max-w-md mx-auto flex flex-col items-center">
                <Button type="submit" form="forgot-password-form" className="w-full" disabled={loading} variant="default">
                    {loading ? 'در حال ارسال کد...' : 'ارسال کد تایید'} {/* Translated: Sending code... / Send Verification Code */}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                    <Link href="/login" className="text-primary hover:underline">
                        بازگشت به ورود
                    </Link> {/* Translated: Back to Login */}
                </p>
            </div>
        </div>
    );
}
