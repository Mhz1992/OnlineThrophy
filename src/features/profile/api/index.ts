import {apiClient} from "@/lib/apiClient";


// Function to fetch profile data
export const fetchProfileApi = async (): Promise<ProfileResponse> => {
    return apiClient<ProfileResponse>('/api/mindtrail/profile/', {
        method: 'GET',
    });
};

// Function to update profile data
export const updateProfileApi = async (profileData: ProfileUpdateRequest): Promise<ProfileResponse> => {
    return apiClient<ProfileResponse>('/api/mindtrail/profile/', {
        method: 'PUT',
        body: profileData,
    });
};