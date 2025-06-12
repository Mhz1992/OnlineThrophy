import {apiClient} from '@/lib/apiClient';

export const changePasswordApi = async (data: ChangePasswordRequest) => {
    return  apiClient<ChangePasswordResponse>('/api/auth/change_password/', {
        method: 'PUT',
        body: data
    });
};
