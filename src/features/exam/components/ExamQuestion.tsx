import React from 'react';
import { Question } from '@/types/api'; // Removed Choice
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {Input} from "@/components/input";

interface ExamQuestionProps {
    question: Question;
    questionNumber: number;
    // Removed totalQuestions as it was unused
    currentAnswer: string | string[];
    onAnswerChange: (questionId: string, answer: string | string[]) => void;
}

const ExamQuestion: React.FC<ExamQuestionProps> = ({
    question,
    questionNumber,
    // Removed totalQuestions from destructuring
    currentAnswer,
    onAnswerChange,
}) => {
    const handleSingleChoiceChange = (value: string) => {
        onAnswerChange(question.id, value);
    };

    const handleMultiChoiceChange = (choiceId: string, checked: boolean) => {
        let newAnswers: string[] = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
        const choiceText = question.choices?.find(c => c.id === choiceId)?.text;

        if (!choiceText) return; // Should not happen if choices are well-defined

        if (checked) {
            if (!newAnswers.includes(choiceText)) {
                newAnswers.push(choiceText);
            }
        } else {
            newAnswers = newAnswers.filter(answer => answer !== choiceText);
        }
        onAnswerChange(question.id, newAnswers);
    };

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onAnswerChange(question.id, e.target.value);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">
                Q{questionNumber}. {question.text}
            </h3>

            {question.type === 'single-choice' && question.choices && (
                <RadioGroup
                    onValueChange={handleSingleChoiceChange}
                    value={currentAnswer as string}
                    className="space-y-3"
                >
                    {question.choices.map((choice) => ( // Removed Choice type annotation as it's inferred
                        <div key={choice.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={choice.text} id={`q${question.id}-choice-${choice.id}`} />
                            <Label htmlFor={`q${question.id}-choice-${choice.id}`}>{choice.text}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )}

            {question.type === 'multi-choice' && question.choices && (
                <div className="space-y-3">
                    {question.choices.map((choice) => ( // Removed Choice type annotation as it's inferred
                        <div key={choice.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`q${question.id}-choice-${choice.id}`}
                                checked={Array.isArray(currentAnswer) && currentAnswer.includes(choice.text)}
                                onCheckedChange={(checked) => handleMultiChoiceChange(choice.id, !!checked)}
                            />
                            <Label htmlFor={`q${question.id}-choice-${choice.id}`}>{choice.text}</Label>
                        </div>
                    ))}
                </div>
            )}

            {question.type === 'text-input' && (
                <Input
                    id={`q${question.id}-text-input`}
                    type="text"
                    placeholder="Type your answer here..."
                    value={currentAnswer as string}
                    onChange={handleTextInputChange}
                    className="w-full"
                />
            )}
        </div>
    );
};

export default ExamQuestion;
