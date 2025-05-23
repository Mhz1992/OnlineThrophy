'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/input'; // Assuming Input is available
import { Label } from '@/components/ui/label'; // Assuming Label is available

// Helper function for basic Shamsi date validation (copied from register page)
const isValidShamsiDate = (year: number, month: number, day: number): boolean => {
    if (month < 1 || month > 12 || day < 1) {
        return false;
    }

    const isLeapYear = (y: number) => {
        const mod = y % 33;
        return mod === 1 || mod === 5 || mod === 9 || mod === 13 || mod === 17 || mod === 22 || mod === 26 || mod === 30;
    };

    if (month <= 6) { // Farvardin to Shahrivar (months 1-6) have 31 days
        return day <= 31;
    } else if (month <= 11) { // Mehr to Bahman (months 7-11) have 30 days
        return day <= 30;
    } else if (month === 12) { // Esfand (month 12)
        return day <= (isLeapYear(year) ? 30 : 29);
    }
    return false;
};

export default function EditProfilePage() {
    const router = useRouter();
    // Placeholder states for user data (in a real app, these would be pre-filled from API)
    const [name, setName] = useState('نام کاربری'); // Example initial value
    const [family, setFamily] = useState('نام خانوادگی'); // Example initial value
    const [birthDay, setBirthDay] = useState('15'); // Example initial value
    const [birthMonth, setBirthMonth] = useState('5'); // Example initial value
    const [birthYear, setBirthYear] = useState('1370'); // Example initial value

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dateError, setDateError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setDateError('');
        setLoading(true);

        const dayNum = parseInt(birthDay, 10);
        const monthNum = parseInt(birthMonth, 10);
        const yearNum = parseInt(birthYear, 10);

        if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum) || !isValidShamsiDate(yearNum, monthNum, dayNum)) {
            setDateError('تاریخ تولد وارد شده معتبر نیست.');
            setLoading(false);
            return;
        }

        const currentShamsiYear = 1402; // Placeholder for current Shamsi year
        if (yearNum > currentShamsiYear || yearNum < 1300) {
            setDateError('سال تولد باید بین ۱۳۰۰ و سال جاری باشد.');
            setLoading(false);
            return;
        }

        const birthDate = `${yearNum}/${monthNum.toString().padStart(2, '0')}/${dayNum.toString().padStart(2, '0')}`;

        try {
            // Simulate API call for updating profile
            console.log('Updating profile with:', { name, family, birthDate });
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

            // In a real application, you would call your update profile API here
            // const response = await fetch('/api/profile/update', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, family, birthDate }),
            // });
            // if (!response.ok) {
            //     const data = await response.json();
            //     throw new Error(data.message || 'خطا در بروزرسانی پروفایل');
            // }

            alert('پروفایل با موفقیت بروزرسانی شد!'); // Translated: Profile updated successfully
            router.push('/profile'); // Redirect back to profile page

        } catch (err: unknown) { // Changed 'any' to 'unknown'
            if (err instanceof Error) {
                setError(err.message || 'خطای غیرمنتظره‌ای رخ داد. لطفا دوباره تلاش کنید.');
            } else {
                setError('خطای غیرمنتظره‌ای رخ داد. لطفا دوباره تلاش کنید.');
            }
            console.error('Profile update error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 justify-between">
            {/* Header Section - Top */}
            <div className="text-right w-full  mx-auto mt-8">
                <h1 className="text-2xl font-semibold">ویرایش پروفایل</h1>
                <p className="text-muted-foreground mt-2">اطلاعات کاربری خود را ویرایش کنید.</p>
            </div>

            {/* Form Content Section - Middle, takes available space */}
            <div className="flex-grow flex flex-col items-center justify-center w-full  mx-auto">
                <div className="w-full">
                    <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">نام</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="نام"
                            />
                        </div>
                        <div>
                            <Label htmlFor="family">نام خانوادگی</Label>
                            <Input
                                id="family"
                                type="text"
                                value={family}
                                onChange={(e) => setFamily(e.target.value)}
                                required
                                placeholder="نام خانوادگی"
                            />
                        </div>
                        <div>
                            <Label>تاریخ تولد</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="birth-day"
                                    type="number"
                                    value={birthDay}
                                    onChange={(e) => setBirthDay(e.target.value)}
                                    required
                                    placeholder="روز"
                                    className="w-1/3 text-center"
                                    dir="ltr"
                                    min="1"
                                    max="31"
                                />
                                <Input
                                    id="birth-month"
                                    type="number"
                                    value={birthMonth}
                                    onChange={(e) => setBirthMonth(e.target.value)}
                                    required
                                    placeholder="ماه"
                                    className="w-1/3 text-center"
                                    dir="ltr"
                                    min="1"
                                    max="12"
                                />
                                <Input
                                    id="birth-year"
                                    type="number"
                                    value={birthYear}
                                    onChange={(e) => setBirthYear(e.target.value)}
                                    required
                                    placeholder="سال"
                                    className="w-1/3 text-center"
                                    dir="ltr"
                                    min="1300"
                                    max="1402" // Adjust max year dynamically if needed
                                />
                            </div>
                            {dateError && <p className="text-red-500 text-sm mt-1">{dateError}</p>}
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </div>
            </div>

            {/* Buttons Section - Very Bottom */}
            <div className="w-full max-w-md mx-auto flex flex-col items-center mt-auto mb-12"> {/* Changed p-4 to mb-4 */}
                <Button type="submit" form="edit-profile-form" className="w-full" disabled={loading} variant="default">
                    {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                </Button>
                <Link href="/profile" className="w-full mt-2">
                    <Button className="w-full" variant="outline">
                        بازگشت
                    </Button>
                </Link>
            </div>
        </div>
    );
}
