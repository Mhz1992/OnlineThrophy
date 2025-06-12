import {apiClient} from "@/lib/apiClient";

export const loginUserApi = async (credentials: LoginRequest) => {
    // Call apiClient directly and pass method in options
    return apiClient<LoginResponse>('/api/auth/login/', {
        method: 'POST',
        body: credentials,
        isAuthRequest: true, // Mark as an auth request so no token is sent with this request
    });
};
