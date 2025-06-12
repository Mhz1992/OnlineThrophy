import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { changePasswordApi } from './api';

interface UseChangePasswordMutationOptions {
    onSuccess?: (data: ChangePasswordResponse) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
}

export const useChangePasswordMutation = (options?: UseChangePasswordMutationOptions) => {
    const router = useRouter();

    return useMutation<ChangePasswordResponse, Error, ChangePasswordRequest>({
        mutationFn: changePasswordApi,
        onSuccess: async (data: ChangePasswordResponse) => {
            if (data.data && data.data.access && data.data.refresh) {
                // Update tokens in localStorage
                localStorage.setItem('accessToken', data.data.access);
                localStorage.setItem('authToken', data.data.access); // For backward compatibility
                localStorage.setItem('refreshToken', data.data.refresh);

                // Call the API route to set the HTTP-only cookies
                try {
                    await fetch('/api/auth/set-token-cookie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ access: data.data.access, refresh: data.data.refresh }),
                    });
                } catch (cookieError) {
                    console.error('Failed to set token cookie after password change:', cookieError);
                }

                toast.success(data.message || 'رمز عبور با موفقیت تغییر یافت.');
                router.push('/profile'); // Redirect to profile page or home
            } else {
                const errorMessage = data.message || 'تغییر رمز عبور ناموفق بود.';
                toast.error(errorMessage);
                options?.onError?.(new Error(errorMessage));
            }
            options?.onSuccess?.(data);
        },
        onError: (error: Error) => {
            let errorMessage = 'خطا در تغییر رمز عبور';
            if (error.message) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
            options?.onError?.(error);
        },
        onSettled: options?.onSettled,
    });
};
