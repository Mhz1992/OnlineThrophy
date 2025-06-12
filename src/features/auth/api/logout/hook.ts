import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { logoutUserApi } from "./api";

interface UseLogoutMutationOptions {
    onSuccess?: (data: LogoutResponse) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
}

export const useLogoutMutation = (options?: UseLogoutMutationOptions) => {
    const router = useRouter();

    return useMutation<LogoutResponse, Error, LogoutRequest>({
        mutationFn: logoutUserApi,
        onSuccess: async (response: LogoutResponse ) => {
            if (response ) {
                // Clear tokens from localStorage
                localStorage.removeItem('accessToken');
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');

                // Call the API route to clear the HTTP-only cookies
                try {
                    await fetch('/api/auth/clear-token-cookie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                } catch (cookieError) {
                    console.error('Failed to clear token cookie:', cookieError);
                }

                toast.success('خروج موفقیت‌آمیز بود!');
                router.push('/login'); // Redirect to login page
            } else {
                // This branch handles cases where the API might return a 200 OK but with a logical error message
                const errorMessage = 'خروج ناموفق بود';
                toast.error(errorMessage);
                options?.onError?.(new Error(errorMessage));
            }
            options?.onSuccess?.(response);
        },
        onError: (err: Error) => {
            toast.error(err.message);
            options?.onError?.(err);
        },
        onSettled: options?.onSettled,
    });
};