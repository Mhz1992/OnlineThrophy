'use client';

import React from 'react';
import { Button } from '@/components/button';
import { cn, toPersianNumber } from '@/lib/utils';
import { Question } from '@/types/api';

interface QuestionDisplayProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    currentAnswer: string | string[]; // Changed from selectedAnswerId, now supports string or array of strings
    onAnswerChange: (questionId: string, answer: string | string[]) => void; // Changed from onAnswerSelect
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
    question,
    questionNumber,
    totalQuestions,
    currentAnswer, // Changed prop name
    onAnswerChange, // Changed prop name
}) => {
    const sortedChoices = question.choices?.sort((a, b) => a.priority - b.priority) || [];

    const handleChoiceClick = (choiceId: string) => {
        if (question.type === 'single-choice') {
            // For single-choice, set the selected choice ID
            onAnswerChange(question.id, choiceId);
        } else if (question.type === 'multi-choice') {
            // For multi-choice, toggle the choice ID in the array
            const currentSelected = Array.isArray(currentAnswer) ? currentAnswer : [];
            const newSelected = currentSelected.includes(choiceId)
                ? currentSelected.filter(id => id !== choiceId)
                : [...currentSelected, choiceId];
            onAnswerChange(question.id, newSelected);
        }
        // If there are other question types (e.g., 'text-input'), they would need different input elements and handling.
    };

    return (
        <div className="w-full">
            <div className="mb-4 text-left text-sm text-gray-500 dark:text-gray-400">
                {toPersianNumber(questionNumber)}/{toPersianNumber(totalQuestions)}
            </div>
            <h3 className="text-lg font-semibold mb-6 text-right text-gray-900 dark:text-gray-100">
                {question.text}
            </h3>

            <h4 className="text-primary font-bold text-right mb-4">
                {question.type === 'multi-choice' ? 'گزینه(های) صحیح را انتخاب کنید:' : 'بهترین گزینه را انتخاب کنید:'}
            </h4>

            <div className="space-y-3 mb-8">
                {sortedChoices.map((choice, index) => {
                    let isSelected = false;
                    if (question.type === 'single-choice') {
                        isSelected = currentAnswer === choice.id;
                    } else if (question.type === 'multi-choice') {
                        isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(choice.id);
                    }

                    return (
                        <Button
                            key={choice.id}
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-right py-3 px-4 rounded-lg border",
                                "bg-gray-100 text-black dark:bg-gray-700 dark:text-white",
                                isSelected && "bg-primary text-white border-primary hover:bg-primary hover:text-white",
                            )}
                            onClick={() => handleChoiceClick(choice.id)}
                        >
                            <span className={cn(
                                "ml-2 flex items-center justify-center w-6 h-6",
                                isSelected ? "text-white " : "bg-transparent text-black dark:text-white border-black dark:border-white"
                            )}>
                                {toPersianNumber(index + 1)}
                            </span>
                            <span className="flex-1">{choice.text}</span>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};
