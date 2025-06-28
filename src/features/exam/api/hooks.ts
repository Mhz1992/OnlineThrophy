import {useQuery} from '@tanstack/react-query';
import {fetchExamQuestionAndAnswer} from './api';

export const useExamQuestionAndAnswers = (exam_id: string) => {
    return useQuery({
        queryKey: ['exam', exam_id],
        queryFn: () => fetchExamQuestionAndAnswer(exam_id),
    });
};
