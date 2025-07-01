import {apiClient} from "@/lib/apiClient";


export const fetchSessionMediaApi = async (exam_id: string): Promise<SessionMediaResponse> => {
    return apiClient<SessionMediaResponse>(`/api/mindtrail/exams/${exam_id}/questions/`, {
        method: 'GET',
    });
};
