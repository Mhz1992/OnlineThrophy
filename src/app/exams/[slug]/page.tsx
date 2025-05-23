'use client';

import React, { useState, useEffect } from 'react'; // Added useEffect
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/button';
import { ArrowLIcon } from "@/features/common/assets/svg";
import { QuestionDisplay } from '@/components/features/exams/QuestionDisplay';
import { Exam } from '@/types/api';
import { cn } from '@/lib/utils';
import { ExamQuestionSkeleton } from '@/features/skeleton/ExamQuestionSkeleton';
import { ExamCompletionDrawer } from '@/features/drawers/ExamCompletionDrawer';

interface ExamPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function ExamPage({ params }: ExamPageProps) {
    const router = useRouter();
    const { slug } = React.use(params);

    const { data: examData, isLoading, isError } = useQuery<Exam, Error>({
        queryKey: ['exam', slug],
        queryFn: async () => {
            const response = await fetch(`/api/exams/${slug}`);
            if (!response.ok) {
                throw new Error('Failed to fetch exam data');
            }
            return response.json();
        },
        // Removed onSuccess from here
    });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});
    const [isExamFinishedDrawerOpen, setIsExamFinishedDrawerOpen] = useState(false);

    // Use useEffect to initialize userAnswers when examData is loaded
    useEffect(() => {
        if (examData) {
            const initialAnswers: Record<string, string | string[]> = {};
            examData.questions.forEach(q => {
                initialAnswers[q.id] = q.type === 'multi-choice' ? [] : '';
            });
            setUserAnswers(initialAnswers);
        }
    }, [examData]); // Depend on examData

    const currentQuestion = examData?.questions[currentQuestionIndex];
    const totalQuestions = examData?.questions.length || 0;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    const handleAnswerChange = (questionId: string, answer: string | string[]) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const handleNextQuestion = () => {
        if (isLastQuestion) {
            console.log("Exam finished! User Answers:", userAnswers);
            setIsExamFinishedDrawerOpen(true);
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <h1 className="text-2xl font-bold">خطا در بارگذاری آزمون!</h1>
                <p className="text-gray-600 mt-2">متاسفانه مشکلی در دریافت اطلاعات آزمون پیش آمده است.</p>
                <Button onClick={() => router.back()} className="mt-4">
                    بازگشت
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 px-4">
                <h1 className="text-xl font-bold text-right">آزمون اصلی</h1>
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-primary dark:text-primary-foreground"
                >
                    <span>خروج</span>
                    <ArrowLIcon height={20} width={20} className={cn("text-primary dark:text-primary-foreground")} />
                </Button>
            </header>

            <main className="flex-1 overflow-y-auto p-4">
                {isLoading ? (
                    <ExamQuestionSkeleton />
                ) : currentQuestion ? (
                    <QuestionDisplay
                        question={currentQuestion}
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={totalQuestions}
                        currentAnswer={userAnswers[currentQuestion.id]}
                        onAnswerChange={handleAnswerChange}
                    />
                ) : (
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        آزمون بارگذاری نشد یا به پایان رسیده است.
                    </div>
                )}
            </main>

            <div className="sticky bottom-0 w-full dark:border-gray-700 pt-4 pb-4 px-4">
                <Button
                    variant="outline"
                    onClick={handleNextQuestion}
                    disabled={isLoading || !userAnswers[currentQuestion?.id || '']}
                    className="w-full"
                >
                    {isLastQuestion ? 'پایان آزمون' : 'سوال بعدی'}
                </Button>
            </div>

            <ExamCompletionDrawer
                open={isExamFinishedDrawerOpen}
                onOpenChange={setIsExamFinishedDrawerOpen}
            />
        </div>
    );
}
