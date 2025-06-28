import {apiClient} from "@/lib/apiClient";


export const fetchExamQuestionAndAnswer = async (exam_id: string): Promise<ExamQuestionsResponse> => {
    return apiClient<ExamQuestionsResponse>(`/api/mindtrail/exams/${exam_id}/questions/`, {
        method: 'GET',
    });
};
