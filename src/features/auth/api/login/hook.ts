import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { loginUserApi } from "./api";

interface UseLoginMutationOptions {
    onSuccess?: (data: LoginResponse) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
}

export const useLoginMutation = (options?: UseLoginMutationOptions) => {
    const router = useRouter();

    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: loginUserApi,
        onSuccess: async (response: LoginResponse) => {
            if (response && response.access) {

                // Call the API route to set the HTTP-only cookies
                // try {
                //     await fetch('/api/auth/set-token-cookie', {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify({ access: response.access, refresh: response.refresh }),
                //     });
                // } catch (cookieError) {
                //     console.error('Failed to set token cookie:', cookieError);
                // }

                toast.success('ورود موفقیت‌آمیز بود!');
                router.push('/home'); // Redirect to home page
            } else {
                const errorMessage = 'ورود ناموفق بود';
                toast.error(errorMessage);
                options?.onError?.(new Error(errorMessage));
            }
            options?.onSuccess?.(response);
        },
        onError: (err: Error) => {
            const errorMessage = err.message || 'ورود ناموفق بود';
            toast.error(errorMessage, {
                duration: 5000,
                position: 'top-center',
            });
            options?.onError?.(err);
        },
        onSettled: options?.onSettled,
    });
};
