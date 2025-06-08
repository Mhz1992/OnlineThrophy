'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Label} from '@/components/ui/label';
import Link from 'next/link';
import {Input} from "@/components/input";
import {Button} from "@/components/ui/button";
import {EyeIcon, EyeOffIcon} from '@/src/components/icons/EyeIcons';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/src/components/drawer';
import {useMutation} from '@tanstack/react-query'; // New import for React Query
import {toast} from 'sonner'; // New import for toast notifications

import {SuccessIcon} from "@/features/common/assets/svg";
import {convertDigitsToEnglish} from "@/core/utils/convertDigitsToEnglish";

// Helper function for basic Shamsi date validation
const isValidShamsiDate = (year: number, month: number, day: number): boolean => {
    if (month < 1 || month > 12 || day < 1) {
        return false;
    }

    // A common simplified rule for Persian leap years (every 4th year, with exceptions)
    // For a more accurate check, consider a dedicated library like 'jalaali-js'.
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

export default function RegisterPage() {
    const [apiError, setApiError] = useState(''); // State for API-related errors
    const [dateError, setDateError] = useState(''); // State for date validation errors
    const [showPassword, setShowPassword] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer visibility
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Function to perform the registration API call
    const registerUserApi = async (userData: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        password: string;
        birthDate: string,
        email: string
    }) => {
        // Use the proxied path instead of the direct external URL
        console.log(userData)
        const response = await fetch(`/api/backend/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                userData
            ),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'ثبت نام ناموفق بود');
        }
        return response.json();
    };

    // React Query mutation hook
    const registerUser = useMutation({
        mutationFn: registerUserApi,
        onSuccess: () => {
            setIsDrawerOpen(true);
            // Optionally, you might want to clear the form fields here
            // e.g., (document.getElementById('register-form') as HTMLFormElement)?.reset();
        },
        onError: (err: Error) => {
            setApiError(err.message); // Set the API error message to local state
            toast.error(err.message); // Show a toast notification
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(''); // Clear previous API errors
        setDateError(''); // Clear previous date validation errors

        const formData = new FormData(e.target as HTMLFormElement);

        const firstName = formData.get("name") as string;
        const lastName = formData.get("family") as string;
        const phoneNumber = convertDigitsToEnglish(formData.get("phone") as string);
        const email = formData.get("email") as string; // 'email' is extracted but not sent to backend in original code
        const password = convertDigitsToEnglish(formData.get("password") as string);
        const confirmPassword = convertDigitsToEnglish(formData.get("confirm-password") as string);
        const birthDay = formData.get("birth-day") as string;
        const birthMonth = formData.get("birth-month") as string;
        const birthYear = formData.get("birth-year") as string;

        if (password !== confirmPassword) {
            setApiError('رمز عبور و تکرار آن مطابقت ندارند.');
            return;
        }

        if (
            !birthDay ||
            !birthMonth ||
            !birthYear ||
            typeof birthDay !== "string" ||
            typeof birthMonth !== "string" ||
            typeof birthYear !== "string") {
            setDateError('تاریخ تولد وارد شده معتبر نیست.');
            return;
        }

        const dayNum = parseInt(birthDay, 10);
        const monthNum = parseInt(birthMonth, 10);
        const yearNum = parseInt(birthYear, 10);

        if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum) || !isValidShamsiDate(yearNum, monthNum, dayNum)) {
            setDateError('تاریخ تولد وارد شده معتبر نیست.');
            return;
        }

        const currentShamsiYear = 1402; // Placeholder for current Shamsi year
        if (yearNum > currentShamsiYear || yearNum < 1300) {
            setDateError('سال تولد باید بین ۱۳۰۰ و سال جاری باشد.');
            return;
        }

        const birthDate = `${yearNum}-${monthNum.toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;

        // Trigger the mutation with the collected data
        registerUser.mutate({firstName, lastName, phoneNumber, password, birthDate, email});
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 justify-between">
            {/* Header Section - Top */}
            <div className="text-right w-full max-w-md mx-auto mt-24">
                <h1 className="text-2xl font-semibold">ثبت نام</h1>
                <p className="text-muted-foreground mt-2">برای شروع حساب کاربری خود را ایجاد کنید.</p>
            </div>

            {/* Form Content Section - Middle, takes available space */}
            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto">
                <div className="w-full">
                    <form id="register-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">نام</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="مثال: نیما"
                            />
                        </div>
                        <div>
                            <Label htmlFor="family">نام خانوادگی</Label>
                            <Input
                                id="family"
                                type="text"
                                name="family"
                                required
                                placeholder="مثال: انصاری"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">شماره تلفن</Label>
                            <Input
                                id="phone"
                                type="tel"
                                name="phone"
                                required
                                placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">پست الکترونیک</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                placeholder="مثال: my_email@gmail.com"
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
                        </div>
                        <div>
                            <Label htmlFor="confirm-password">تکرار رمز عبور</Label>
                            <div className="relative">
                                <Input
                                    id="confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirm-password"
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
                        </div>
                        <div>
                            <Label>تاریخ تولد</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="birth-day"
                                    type="number"
                                    name="birth-day"
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
                                    name="birth-month"
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
                                    name="birth-year"
                                    required
                                    placeholder="سال"
                                    className="w-1/3 text-center"
                                    dir="ltr"
                                    min="1300"
                                    max="1402"
                                />
                            </div>
                            {dateError && <p className="text-red-500 text-sm mt-1">{dateError}</p>}
                        </div>
                        {/* Display API error if any */}
                        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
                    </form>
                </div>
            </div>

            {/* Combined Button and Login Link Section - Very Bottom */}
            <div className="w-full max-w-md mx-auto flex flex-col items-center">
                <Button type="submit" form="register-form" className="w-full" disabled={registerUser.isPending}
                        variant="default">
                    {registerUser.isPending ? 'در حال ثبت نام...' : 'ثبت نام'}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                    حساب کاربری دارید؟{' '}
                    <Link href="/login" className="text-primary hover:underline">
                        ورود کنید
                    </Link>
                </p>
            </div>

            {/* Success Drawer */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="flex flex-col items-center justify-center p-6 text-center">
                    <DrawerHeader className="flex flex-col items-center justify-center text-center ">
                        <SuccessIcon width={250} height={250} className="mb-8 mx-auto"/>
                        <DrawerTitle className="text-2xl font-bold text-primary">ثبت نام با موفقیت انجام
                            شد</DrawerTitle>
                        <DrawerDescription className="text-muted-foreground mt-2">
                            تبریک! ثبت نام شما با موفقیت انجام شد. می توانید از این برنامه با حساب کاربری خود استفاده
                            کنید.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="w-full mt-6">
                        <Button onClick={() => router.push('/login')} className="w-full">
                            ورود
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
