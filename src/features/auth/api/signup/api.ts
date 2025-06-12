import {apiClient} from "@/lib/apiClient";

export const signupUserApi = async (userData: SignupRequest) => {
    // Pass isAuthRequest: true because this is the signup call itself, no token needed
    return apiClient<SignupResponse>('/api/auth/signup/', {
        method: 'POST',
        body: userData,
        isAuthRequest: true, // Mark as an auth request so no token is sent with this request
    });
};