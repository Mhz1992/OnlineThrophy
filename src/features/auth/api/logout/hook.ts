import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { logoutUserApi } from "./api";
import {LogoutRequest} from "@/features/auth/api/logout/types";

interface UseLogoutMutationOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
}

export const useLogoutMutation = (options?: UseLogoutMutationOptions) => {
    const router = useRouter();

    return useMutation<void, Error, LogoutRequest>({
        mutationFn: logoutUserApi,
        onSuccess: async () => {
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
                router.push('/login');
        },
        onError: (err: Error) => {
            console.log(err)
            toast.error('خروج ناموفق بود');
            options?.onError?.(err);
        },
        onSettled: options?.onSettled,
    });
};