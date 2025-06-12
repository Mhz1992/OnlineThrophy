'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from '@/src/components/icons/EyeIcons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '@/features/auth/api/change-password/hook'; // Import the new hook

// Define the schema for form validation
const changePasswordSchema = z.object({
    old_password: z.string().min(6, 'رمز عبور فعلی باید حداقل ۶ کاراکتر باشد.'),
    new_password: z.string().min(6, 'رمز عبور جدید باید حداقل ۶ کاراکتر باشد.'),
    confirm_password: z.string().min(6, 'تایید رمز عبور جدید باید حداقل ۶ کاراکتر باشد.'),
}).refine((data) => data.new_password === data.confirm_password, {
    message: 'رمز عبور جدید و تایید آن مطابقت ندارند.',
    path: ['confirm_password'], // Path of the error
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
    });

    const changePasswordMutation = useChangePasswordMutation({
        onSuccess: () => {
            reset(); // Clear form fields on success
        },
    });

    const onSubmit = async (data: ChangePasswordFormValues) => {
        // Client-side validation for new password and confirmation is handled by Zod refine
        // Now, trigger the mutation
        changePasswordMutation.mutate({
            old_password: data.old_password,
            new_password: data.new_password,
        });
    };

    return (
        <div className="flex flex-col h-full px-4 py-8 justify-between">
            <div className="text-right w-full max-w-md mx-auto mt-24">
                <h1 className="text-2xl font-semibold">تغییر رمز عبور</h1>
                <p className="text-muted-foreground mt-2">رمز عبور فعلی و جدید خود را وارد کنید.</p>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto">
                <div className="w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Old Password Field */}
                        <div>
                            <Label htmlFor="old_password">رمز عبور فعلی</Label>
                            <div className="relative">
                                <Input
                                    id="old_password"
                                    type={showOldPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    className="pr-10"
                                    dir="ltr"
                                    {...register('old_password')}
                                />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    {showOldPassword ? (
                                        <EyeOffIcon onClick={() => setShowOldPassword(false)} className="size-5 text-gray-500 cursor-pointer" />
                                    ) : (
                                        <EyeIcon onClick={() => setShowOldPassword(true)} className="size-5 text-gray-500 cursor-pointer" />
                                    )}
                                </span>
                            </div>
                            {errors.old_password && <p className="text-red-500 text-sm mt-1">{errors.old_password.message}</p>}
                        </div>

                        {/* New Password Field */}
                        <div>
                            <Label htmlFor="new_password">رمز عبور جدید</Label>
                            <div className="relative">
                                <Input
                                    id="new_password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    className="pr-10"
                                    dir="ltr"
                                    {...register('new_password')}
                                />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    {showNewPassword ? (
                                        <EyeOffIcon onClick={() => setShowNewPassword(false)} className="size-5 text-gray-500 cursor-pointer" />
                                    ) : (
                                        <EyeIcon onClick={() => setShowNewPassword(true)} className="size-5 text-gray-500 cursor-pointer" />
                                    )}
                                </span>
                            </div>
                            {errors.new_password && <p className="text-red-500 text-sm mt-1">{errors.new_password.message}</p>}
                        </div>

                        {/* Confirm New Password Field */}
                        <div>
                            <Label htmlFor="confirm_password">تایید رمز عبور جدید</Label>
                            <div className="relative">
                                <Input
                                    id="confirm_password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    className="pr-10"
                                    dir="ltr"
                                    {...register('confirm_password')}
                                />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    {showConfirmPassword ? (
                                        <EyeOffIcon onClick={() => setShowConfirmPassword(false)} className="size-5 text-gray-500 cursor-pointer" />
                                    ) : (
                                        <EyeIcon onClick={() => setShowConfirmPassword(true)} className="size-5 text-gray-500 cursor-pointer" />
                                    )}
                                </span>
                            </div>
                            {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={changePasswordMutation.isPending}>
                            {changePasswordMutation.isPending ? 'در حال تغییر...' : 'تغییر رمز عبور'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
