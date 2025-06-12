import {apiClient} from "@/lib/apiClient";

export const logoutUserApi = async () => {
    // No request body needed for logout
    return apiClient<LogoutResponse>('/api/auth/logout/', {
        method: 'POST',
        body: {
            refresh : localStorage.getItem("refreshToken")
        }
    });
};