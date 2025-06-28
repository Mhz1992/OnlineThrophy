import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchExamQuestionAndAnswerApi, submitExamQuestionApi} from './api';
import {toast} from "sonner";

export const useExamQuestionAndAnswers = (exam_id: string) => {
    return useQuery({
        queryKey: ['exam', exam_id],
        queryFn: () => fetchExamQuestionAndAnswerApi(exam_id),
    });
};

export const useSubmitExamData = (options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}) => {
    return useMutation({
        mutationFn: (examData: SubmitExamDataRequest) => submitExamQuestionApi(examData),
        onSuccess: () => {
            if (options?.onSuccess) {
                options.onSuccess();
            }
        },
        onError: (error: Error) => {
            toast.error(`خطا در ثبت آزمون : ${error.message}`);

            // Call onError callback if provided
            if (options?.onError) {
                options.onError(error);
            }
        },
    });
};