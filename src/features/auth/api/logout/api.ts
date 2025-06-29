import {apiClient} from "@/lib/apiClient";

export const logoutUserApi = async (data: LogoutRequest) => {
    // Call apiClient directly and pass method in options
    return apiClient<LogoutRequest>('/api/auth/logout/', { // Assuming the correct endpoint is /api/auth/logout/
        method: 'POST',
        body: data // Pass the 'data' object directly, which contains { refresh: "your_token_string" }
    });
};
