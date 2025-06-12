import {apiClient} from '@/lib/apiClient';

export const changePasswordApi = async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
    const response = await apiClient<ChangePasswordResponse>('/api/auth/change_password/', {
        method: 'PUT',
        body: data
    });
    return response;
};
