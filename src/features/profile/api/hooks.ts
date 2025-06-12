import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchProfileApi, updateProfileApi} from './index';
import {toast} from 'sonner';

// Hook for fetching profile data
export const useProfileQuery = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfileApi,
    });
};

// Hook for updating profile data
export const useUpdateProfileMutation = (options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (profileData: ProfileUpdateRequest) => updateProfileApi(profileData),
        onSuccess: () => {
            // Invalidate and refetch profile data
            queryClient.invalidateQueries({queryKey: ['profile']});

            // Show success message
            toast.success('پروفایل با موفقیت بروزرسانی شد!');

            // Call onSuccess callback if provided
            if (options?.onSuccess) {
                options.onSuccess();
            }
        },
        onError: (error: Error) => {
            // Show error message
            toast.error(`خطا در بروزرسانی پروفایل: ${error.message}`);

            // Call onError callback if provided
            if (options?.onError) {
                options.onError(error);
            }
        },
    });
};