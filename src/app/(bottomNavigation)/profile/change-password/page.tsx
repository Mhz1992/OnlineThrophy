'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/input';
import {ConfirmChangePasswordDrawer} from "@/features/drawers/ConfirmChangePasswordDrawer";

const changePasswordSchema = z
    .object({
        newPassword: z.string().min(6, 'رمز عبور جدید باید حداقل ۶ کاراکتر باشد.'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'تایید رمز عبور با رمز عبور جدید مطابقت ندارد.',
        path: ['confirmPassword'], // Path of the field to which the error should be attached
    });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [passwordToConfirm, setPasswordToConfirm] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset, // Added reset to clear form fields after successful submission
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
    });

    // This function is called when the main form is submitted
    const onSubmit = async (data: ChangePasswordFormValues) => {
        // Instead of direct API call, open the drawer for confirmation
        setPasswordToConfirm(data.newPassword);
        setIsDrawerOpen(true);
    };

    // This function is called when the user confirms in the drawer
    const handleConfirmChangePassword = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword: passwordToConfirm }),
            });

            // Check if the response is JSON before attempting to parse it
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // If not JSON, it's likely an HTML error page or unexpected response
                const textError = await response.text(); // Read as text to avoid JSON parsing error
                console.error('Server returned non-JSON response:', textError);
                setError('root.serverError', {
                    type: 'manual',
                    message: 'خطایی غیرمنتظره از سرور دریافت شد. لطفا دوباره تلاش کنید.',
                });
                toast.error("خطایی غیرمنتظره از سرور دریافت شد. لطفا دوباره تلاش کنید.");
                setLoading(false);
                setIsDrawerOpen(false);
                setPasswordToConfirm('');
                return; // Stop further processing
            }

            const result = await response.json();

            if (response.ok) {
                toast("رمز عبور شما با موفقیت تغییر یافت.");
                reset(); // Clear form fields
                router.push('/profile'); // Redirect to profile page on success
            } else {
                // Handle API errors (assuming the server returns JSON errors)
                setError('root.serverError', {
                    type: 'manual',
                    message: result.message || 'خطایی در تغییر رمز عبور رخ داد.',
                });
                toast.error('خطایی در تغییر رمز عبور رخ داد.');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setError('root.serverError', {
                type: 'manual',
                message: 'خطایی در شبکه رخ داد. لطفا دوباره تلاش کنید.',
            });
            toast.error('خطایی در شبکه رخ داد. لطفا دوباره تلاش کنید.');
        } finally {
            setLoading(false);
            setIsDrawerOpen(false); // Close drawer after attempt
            setPasswordToConfirm(''); // Clear stored password
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900 px-4 py-8 justify-between">
            <div className="text-right w-full mx-auto mt-8">
                <h1 className="text-2xl font-semibold">تغییر رمز عبور</h1>
                <p className="text-muted-foreground mt-2">این صفحه برای تغییر رمز عبور حساب کاربری شماست.</p>
            </div>

            <div className="flex-grow flex items-center justify-center w-full mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="newPassword">رمز عبور جدید</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="رمز عبور جدید"
                            {...register('newPassword')}
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">تایید رمز عبور جدید</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="تایید رمز عبور جدید"
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    {errors.root?.serverError && (
                        <p className="text-red-500 text-sm text-center">{errors.root.serverError.message}</p>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                        تغییر رمز عبور
                    </Button>
                </form>
            </div>

            <div className="w-full max-w-md mx-auto mt-auto mb-12"> {/* Changed p-4 to mb-4 */}
                <Link href="/profile" passHref>
                    <Button className="w-full" variant="outline">
                        بازگشت به حساب کاربری
                    </Button>
                </Link>
            </div>

            <ConfirmChangePasswordDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}
                                         passwordToConfirm={passwordToConfirm} onClick={handleConfirmChangePassword}
                                         disabled={loading}/>
        </div>
    );
}
