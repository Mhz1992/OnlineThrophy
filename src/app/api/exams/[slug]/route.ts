import {NextResponse, NextRequest} from 'next/server';
import {Exam} from '@/types/api';

const MOCK_EXAM_DATA: Record<string, Exam> = {
    'psychology-intro-exam': { // Changed slug key to match home/route.ts
        id: 'exam-main-1',
        slug: 'psychology-intro-exam', // Ensure this slug matches the key
        title: 'آزمون اصلی',
        description: 'این آزمون شامل ۱۰ سوال تستی برای ارزیابی دانش شماست.',
        durationMinutes: 30,
        questions: [
            {
                id: 'q1',
                text: 'کدام یک از مکاتب روانشناسی بر ناخودآگاه و تجربیات اولیه کودکی تأکید دارد؟',
                type: 'single-choice',
                priority: 1,
                choices: [
                    { id: 'c1a', text: 'رفتارگرایی', priority: 1 },
                    { id: 'c1b', text: 'روانکاوی', priority: 1 },
                    { id: 'c1c', text: 'انسان‌گرایی', priority: 1 },
                    { id: 'c1d', text: 'شناختی', priority: 1 },
                ],
                correctAnswer: 'c1b',
            },
            {
                id: 'q2',
                text: 'پدر روانشناسی مدرن کیست؟',
                type: 'single-choice',
                priority: 2,
                choices: [
                    { id: 'c2a', text: 'زیگموند فروید' , priority: 1},
                    { id: 'c2b', text: 'بی.اف. اسکینر' , priority: 1},
                    { id: 'c2c', text: 'ویلهلم وونت' , priority: 1},
                    { id: 'c2d', text: 'کارل راجرز' , priority: 1},
                ],
                correctAnswer: 'c2c',
            },
            {
                id: 'q3',
                text: 'کدام بخش از مغز مسئول پردازش احساسات، به ویژه ترس است؟',
                type: 'single-choice',
                priority: 3,
                choices: [
                    { id: 'c3a', text: 'قشر پیش‌پیشانی' , priority: 1},
                    { id: 'c3b', text: 'هیپوکامپ' , priority: 1},
                    { id: 'c3c', text: 'آمیگدال' , priority: 1},
                    { id: 'c3d', text: 'تالاموس' , priority: 1},
                ],
                correctAnswer: 'c3c',
            },
            {
                id: 'q4',
                text: 'نظریه سلسله مراتب نیازهای مزلو شامل کدام یک از موارد زیر است؟',
                type: 'single-choice',
                priority: 4,
                choices: [
                    { id: 'c4a', text: 'نیازهای فیزیولوژیکی' , priority: 1},
                    { id: 'c4b', text: 'نیاز به امنیت' , priority: 1},
                    { id: 'c4c', text: 'نیاز به خودشکوفایی' , priority: 1},
                    { id: 'c4d', text: 'نیاز به قدرت' , priority: 1},
                ],
            },
            {
                id: 'q5',
                text: 'شرطی‌سازی کلاسیک توسط کدام روانشناس معرفی شد؟',
                type: 'single-choice',
                priority: 5,
                choices: [
                    { id: 'c5a', text: 'ایوان پاولف' , priority: 1},
                    { id: 'c5b', text: 'جان واتسون' , priority: 1},
                    { id: 'c5c', text: 'آلبرت بندورا' , priority: 1},
                    { id: 'c5d', text: 'ژان پیاژه' , priority: 1},
                ],
                correctAnswer: 'c5a',
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
