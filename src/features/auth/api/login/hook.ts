import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { apiClient, AuthError } from '@/lib/apiClient'; // Assuming apiClient and AuthError are defined here
import { LoginRequest, LoginResponse } from './types.d'; // Assuming types.d defines LoginRequest and LoginResponse

interface UseLoginMutationOptions {
    onSettled?: () => void;
    onError?: (error: Error) => void;
}

export const useLoginMutation = (options?: UseLoginMutationOptions) => {
    const router = useRouter();

    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: async (data: LoginRequest) => {
            // Use apiClient to make the POST request
            const response = await apiClient.post<LoginResponse>('/api/login', data, { isAuthRequest: true });
            return response;
        },
        onSuccess: async (data: LoginResponse) => {
            if (data && data.access) {
                localStorage.setItem('authToken', data.access); // Store the access token in localStorage
                // If you also have a refresh token, store it too
                if (data.refresh) {
                    localStorage.setItem('refreshToken', data.refresh);
                }

                // Call the new API route to set the HTTP-only cookie
                try {
                    await fetch('/api/auth/set-token-cookie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ access: data.access, refresh: data.refresh }),
                    });
                } catch (cookieError) {
                    console.error('Failed to set token cookie:', cookieError);
                    // Handle this error if necessary, but usually not critical for user flow
                }

                toast.success('ورود موفقیت‌آمیز بود!');
                router.push('/home'); // Redirect to home page after successful login
            } else {
                // This case might happen if the API returns a 200 OK but with a specific error message
                // instead of a token. Adjust based on your actual API response structure.
                toast.error(data.message || 'ورود ناموفق بود');
            }
        },
        onError: (error: Error) => {
            let errorMessage = 'خطا در ورود به حساب کاربری';
            if (error instanceof AuthError) {
                errorMessage = error.message; // Use the message from AuthError
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
            options?.onError?.(error); // Call component's error handler if provided
        },
        onSettled: options?.onSettled, // Call component's settled handler if provided
    });
};
