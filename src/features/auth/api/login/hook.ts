import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'; // Import useRouter
import { loginUserApi } from "./api"; // Assuming this is where loginUserApi is defined
import { LoginRequest, LoginResponse } from "./types.d"; // Assuming types.d defines LoginRequest and LoginResponse

interface UseLoginMutationOptions {
    onSuccess?: (data: LoginResponse) => void; // Allow custom onSuccess callback
    onError?: (error: Error) => void; // Allow custom onError callback
    onSettled?: () => void;
}

export const useLoginMutation = (options?: UseLoginMutationOptions) => { // Define as a custom hook
    const router = useRouter(); // Call useRouter inside the hook

    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: loginUserApi,
        onSuccess: async (response: LoginResponse) => {
            if (response && response.access) {
                localStorage.setItem('authToken', response.access); // Use 'authToken' for consistency
                if (response.refresh) {
                    localStorage.setItem('refreshToken', response.refresh); // Store refresh token
                }

                // Call the new API route to set the HTTP-only cookie
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

                toast.success('ورود موفقیت‌آمیز بود!');
                router.push('/home'); // Redirect to home page
            } else {
                // This branch handles cases where the API might return a 200 OK but with a logical error message
                const errorMessage = response.message || 'ورود ناموفق بود';
                toast.error(errorMessage);
                options?.onError?.(new Error(errorMessage)); // Pass error to custom onError
            }
            options?.onSuccess?.(response); // Call custom onSuccess callback if provided
        },
        onError: (err: Error) => {
            toast.error(err.message); // Show a toast notification
            options?.onError?.(err); // Call custom onError callback if provided
        },
        onSettled: options?.onSettled,
    });
};
