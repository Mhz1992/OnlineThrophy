'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/input';
import {Label} from '@/components/ui/label';
import {useProfileQuery, useUpdateProfileMutation} from '@/features/profile/api/hooks';

const convertToShamsiDateParts = (gregorianDate: string): { year: string, month: string, day: string } => {
    // This is a simplified conversion - in a real app, you'd use a proper date conversion library
    // For now, we'll just parse the date and return the parts
    try {
        const [year, month, day] = gregorianDate.split('-');
        return {
            year,
            month,
            day
        };
    } catch (error) {
        console.error('Error parsing date:', error);
        return {year: '1370', month: '01', day: '01'};
    }
};

// Helper function to convert Shamsi date parts to Gregorian date string (YYYY-MM-DD)
const convertToGregorianDateString = (year: string, month: string, day: string): string => {
    // This is a simplified conversion - in a real app, you'd use a proper date conversion library
    // For now, we'll just format the date parts
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

// Helper function for basic date validation
const isValidDate = (year: number, month: number, day: number): boolean => {
    if (month < 1 || month > 12 || day < 1) {
        return false;
    }

    // Simple validation for days in month
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day <= daysInMonth[month - 1];
};

export default function EditProfilePage() {
    const router = useRouter();
    const {data: profile, isLoading: isProfileLoading, error: profileError} = useProfileQuery();
    const updateProfileMutation = useUpdateProfileMutation({
        onSuccess: () => {
            router.push('/profile');
        }
    });

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [dateError, setDateError] = useState('');

    // Initialize form with profile data when it's loaded
    useEffect(() => {
        if (profile) {
            setFirstName(profile.first_name);
            setLastName(profile.last_name);

            // Convert birthdate to day, month, year
            const {year, month, day} = convertToShamsiDateParts(profile.birthdate);
            setBirthYear(year);
            setBirthMonth(month);
            setBirthDay(day);
        }
    }, [profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDateError('');

        const dayNum = parseInt(birthDay, 10);
        const monthNum = parseInt(birthMonth, 10);
        const yearNum = parseInt(birthYear, 10);

        if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum) || !isValidDate(yearNum, monthNum, dayNum)) {
            setDateError('تاریخ تولد وارد شده معتبر نیست.');
            return;
        }

        const currentYear = 1400;
        console.log(yearNum)
        if (1300 > yearNum || yearNum > currentYear) {
            setDateError('سال تولد باید بین 1300 و سال جاری باشد.');
            return;
        }

        // Format date as YYYY-MM-DD for API
        const birthdate = convertToGregorianDateString(birthYear, birthMonth, birthDay);

        // Create update request
        const updateData: ProfileUpdateRequest = {
            first_name: firstName,
            last_name: lastName,
            birthdate
        };

        // Call update mutation
        updateProfileMutation.mutate(updateData);
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900 px-4 py-8 justify-between">
            {/* Header Section - Top */}
            <div className="text-right w-full mx-auto mt-8">
                <h1 className="text-2xl font-semibold">ویرایش پروفایل</h1>
                <p className="text-muted-foreground mt-2">اطلاعات کاربری خود را ویرایش کنید.</p>
            </div>

            {/* Form Content Section - Middle, takes available space */}
            <div className="flex-grow flex flex-col items-center justify-center w-full mx-auto">
                {isProfileLoading ? (
                    <div className="text-center">
                        <p>در حال بارگذاری اطلاعات پروفایل...</p>
                    </div>
                ) : profileError ? (
                    <div className="text-center text-red-500">
                        <p>خطا در بارگذاری اطلاعات پروفایل. لطفا دوباره تلاش کنید.</p>
                    </div>
                ) : (
                    <div className="w-full">
                        <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="firstName">نام</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    placeholder="نام"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">نام خانوادگی</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
                                    />
                                </div>
                                {dateError && <p className="text-red-500 text-sm mt-1">{dateError}</p>}
                            </div>
                            {updateProfileMutation.error && (
                                <p className="text-red-500 text-sm">
                                    {updateProfileMutation.error instanceof Error
                                        ? updateProfileMutation.error.message
                                        : 'خطای غیرمنتظره‌ای رخ داد. لطفا دوباره تلاش کنید.'}
                                </p>
                            )}
                        </form>
                    </div>
                )}
            </div>

            {/* Buttons Section - Very Bottom */}
            <div className="w-full max-w-md mx-auto flex flex-col items-center mt-auto mb-12">
                <Button
                    type="submit"
                    form="edit-profile-form"
                    className="w-full"
                    disabled={isProfileLoading || updateProfileMutation.isPending}
                    variant="default"
                >
                    {updateProfileMutation.isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
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
