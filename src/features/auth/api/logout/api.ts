import {apiClient} from "@/lib/apiClient";
import { LogoutRequest } from "./types"; // Import LogoutResponse

export const logoutUserApi = async (data: LogoutRequest): Promise<void> => { // Explicitly type return as Promise<void>
    // Call apiClient directly and pass method in options
    await apiClient<LogoutRequest>('/api/auth/logout/', { // Use LogoutResponse and await the call
        method: 'POST',
        body: data // Pass the 'data' object directly, which contains { refresh: "your_token_string" }
    });
    // No explicit return needed as the function is typed to return Promise<void>
};
