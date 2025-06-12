import {apiClient} from "@/lib/apiClient";

export const logoutUserApi = async (data: LogoutRequest) => {
    return apiClient<LogoutResponse>('/api/auth/logout/', {
        method: 'POST',
        body: data
    });
};
