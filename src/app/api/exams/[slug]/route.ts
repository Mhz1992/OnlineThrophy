import {NextResponse, NextRequest} from 'next/server';
import {Exam} from '@/types/api';

const MOCK_EXAM_DATA: Record<string, Exam> = {
    'math-chapter-1': { // Changed slug key to match home/route.ts
        id: 'exam-main-1',
        slug: 'math-chapter-1', // Ensure this slug matches the key
        title: 'آزمون اصلی',
        description: 'این آزمون شامل ۱۰ سوال تستی برای ارزیابی دانش شماست.',
        durationMinutes: 30,
        questions: [
            {
                id: 'q1',
                priority: 1,
                text: 'کدام یک از موارد زیر از ویژگی‌های اصلی یک سیستم عامل است؟',
                type: 'single-choice',
                choices: [
                    {id: 'q1c1', text: 'مدیریت حافظه', priority: 1},
                    {id: 'q1c2', text: 'مدیریت پردازنده', priority: 2},
                    {id: 'q1c3', text: 'مدیریت فایل', priority: 3},
                    {id: 'q1c4', text: 'همه موارد', priority: 4},
                ],
                correctAnswer: 'q1c4',
            },
            {
                id: 'q2',
                priority: 2,
                text: 'پروتocol HTTP در کدام لایه از مدل OSI قرار دارد؟',
                type: 'single-choice',
                choices: [
                    {id: 'q2c1', text: 'لایه شبکه', priority: 1},
                    {id: 'q2c2', text: 'لایه انتقال', priority: 2},
                    {id: 'q2c3', text: 'لایه کاربرد', priority: 3},
                    {id: 'q2c4', text: 'لایه فیزیکی', priority: 4},
                ],
                correctAnswer: 'q2c3',
            },
            {
                id: 'q3',
                priority: 3,
                text: 'کدام زبان برنامه‌نویسی برای توسعه وب‌سایت‌های پویا استفاده می‌شود؟',
                type: 'single-choice',
                choices: [
                    {id: 'q3c1', text: 'C++', priority: 1},
                    {id: 'q3c2', text: 'Java', priority: 2},
                    {id: 'q3c3', text: 'Python', priority: 3},
                    {id: 'q3c4', text: 'JavaScript', priority: 4},
                ],
                correctAnswer: 'q3c4',
            },

        ].sort((a, b) => a.priority - b.priority),
    },
};

// Corrected the type for the 'params' object. It should be a direct object, not a Promise.
export async function GET(request: NextRequest, {params}: {
    params: Promise<{ slug: string }>
}): Promise<NextResponse> {
    const {slug} = await params; // Removed await

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const exam = MOCK_EXAM_DATA[slug];

    if (!exam) {
        return NextResponse.json({message: 'Exam not found'}, {status: 404});
    }

    return NextResponse.json(exam);
}
