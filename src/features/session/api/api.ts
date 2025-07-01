import {apiClient} from "@/lib/apiClient";


export const fetchSessionMediaApi = async (session_id: string): Promise<SessionMediaResponse> => {
    return apiClient<SessionMediaResponse>(`/api/mindtrail/user-therapy-history/${session_id}/session/`, {
        method: 'GET',
    });
};
