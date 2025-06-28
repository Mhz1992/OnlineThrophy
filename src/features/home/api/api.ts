import {apiClient} from "@/lib/apiClient";


export const fetchHomeDataSessionApi = async (): Promise<HomeData> => {
    return apiClient<HomeData>('/api/mindtrail/home/', {
        method: 'GET',
    });
};
