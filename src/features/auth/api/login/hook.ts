import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import { loginUserApi } from "./api";

export const loginMutation = useMutation({
    mutationFn: loginUserApi,
    onSuccess: async (response: LoginResponse) => { // Made async to await cookie setting
        // Save the token to localStorage upon successful login
        if (response && response.access) {
            localStorage.setItem('access', response.access); // Save the token
            localStorage.setItem('refresh', response.refresh); // Save the token

            // Call the new API route to set the HTTP-only cookie
            try {
                await fetch('/api/auth/set-token-cookie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({access: response.access , refresh : response.refresh}),
                });
            } catch (cookieError) {
                console.error('Failed to set token cookie:', cookieError);
                // Handle this error if necessary, but usually not critical for user flow
            }

            toast.success('ورود موفقیت‌آمیز بود');
            router.push('/'); // Redirect to home page
        } else {
            // Handle cases where success is false but response is still OK (e.g., custom API errors)
            setApiError(response.message || 'ورود ناموفق بود');
            toast.error(response.message || 'ورود ناموفق بود');
        }
    },
    onError: (err: Error) => {
        setApiError(err.message); // Set the API error message to local state
        toast.error(err.message); // Show a toast notification
    },
});
