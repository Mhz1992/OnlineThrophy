import { apiClient } from '@/lib/apiClient';
import { ChangePasswordRequest, ChangePasswordResponse } from './types.d';

export const changePasswordApi = async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
    // This API call requires authentication, so apiClient will automatically attach the token.
    const response = await apiClient.post<ChangePasswordResponse>('/api/auth/change_password/', data);
    return response;
};
