import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {useRouter} from 'next/navigation';
import {logoutUserApi} from "./api";

interface UseLogoutMutationOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
}

export const useLogoutMutation = (options?: UseLogoutMutationOptions) => {
    const router = useRouter();

    return useMutation({
        mutationFn: logoutUserApi,
        onSuccess: async () => {
                toast.success('خروج موفقیت‌آمیز بود!');
                router.push('/login');
        },
        onError: (err: Error) => {
            console.log(err)
            toast.error('خروج ناموفق بود');
            options?.onError?.(err);
        },
        onSettled: options?.onSettled,
    });
};
