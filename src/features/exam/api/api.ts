import {apiClient} from "@/lib/apiClient";


export const fetchExamQuestionAndAnswerApi = async (exam_id: string): Promise<ExamQuestionsResponse> => {
    return apiClient<ExamQuestionsResponse>(`/api/mindtrail/exams/${exam_id}/questions/`, {
        method: 'GET',
    });
};

export const submitExamQuestionApi = async (examDataRequest: SubmitExamDataRequest): Promise<SubmitExamDataResponse> => {
    return apiClient<SubmitExamDataResponse>('/api/mindtrail/exams/submit/', {
        method: 'POST',
        body: examDataRequest,
    });
};