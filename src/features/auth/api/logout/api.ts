import {apiClient} from "@/lib/apiClient";

export const logoutUserApi = async (refresh: { refresh: string }) => {
    // No request body needed for logout
    return apiClient<LogoutResponse>('/api/auth/logout/', {
        method: 'POST',
        body: {
            refresh: refresh
        }
    });
};