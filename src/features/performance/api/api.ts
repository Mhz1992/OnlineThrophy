import {apiClient} from "@/lib/apiClient";


export const fetchPerformanceApi = async (): Promise<PerformanceResponse> => {
    return apiClient<PerformanceResponse>('/api/mindtrail/performance/', {
        method: 'GET',
    });
};
