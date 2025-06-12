import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { signupUserApi } from "./api";

interface UseSignupMutationOptions {
    onSuccess?: (data: SignupResponse) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
}

export const useSignupMutation = (options?: UseSignupMutationOptions) => {
    const router = useRouter();

    return useMutation<SignupResponse, Error, SignupRequest>({
        mutationFn: signupUserApi,
        onSuccess: async (response: SignupResponse) => {
            if (response && response.access) {
                localStorage.setItem('accessToken', response.access);
                if (response.refresh) {
                    localStorage.setItem('refreshToken', response.refresh);
                }
                try {
                    await fetch('/api/auth/set-token-cookie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ access: response.access, refresh: response.refresh }),
                    });
                } catch (cookieError) {
                    console.error('Failed to set token cookie:', cookieError);
                }

                toast.success('ثبت نام موفقیت‌آمیز بود!');
                router.push('/home'); // Redirect to home page
            } else {
                // This branch handles cases where the API might return a 200 OK but with a logical error message
                const errorMessage = 'ثبت نام ناموفق بود';
                toast.error(errorMessage);
                options?.onError?.(new Error(errorMessage));
            }
            options?.onSuccess?.(response);
        },
        onError: (err: Error) => {
            // Display the error message from Django in a toast notification
            // The message has already been extracted and formatted by the apiClient
            const errorMessage = err.message || 'ثبت نام ناموفق بود';
            toast.error(errorMessage, {
                duration: 5000, // Show for 5 seconds to give users time to read longer error messages
                position: 'top-center',
            });
            options?.onError?.(err);
        },
        onSettled: options?.onSettled,
    });
};
