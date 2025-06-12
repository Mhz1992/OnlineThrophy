import {apiClient} from "@/lib/apiClient";

export const loginUserApi = async (credentials: LoginRequest) => {
    // Pass isAuthRequest: true because this is the login call itself, no token needed yet
    return apiClient<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: credentials,
        isAuthRequest: true, // Mark as an auth request so no token is sent with this request
    });
};