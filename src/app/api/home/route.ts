import { NextResponse } from 'next/server';
import { Exam, TrophySession } from '@/types/api';

const MOCK_UNFINISHED_EXAM: Exam = {
    id: 'exam-psychology-101',
    title: 'آزمون مقدماتی روانشناسی',
    description: 'یک آزمون برای ارزیابی دانش پایه شما در روانشناسی.',
    durationMinutes: 60,
    slug: 'psychology-intro-exam',
    questions: [
        {
            id: 'q1',
            text: 'کدام یک از مکاتب روانشناسی بر ناخودآگاه و تجربیات اولیه کودکی تأکید دارد؟',
            type: 'single-choice',
            priority: 1,
            choices: [
                { id: 'c1a', text: 'رفتارگرایی' },
                { id: 'c1b', text: 'روانکاوی' },
                { id: 'c1c', text: 'انسان‌گرایی' },
                { id: 'c1d', text: 'شناختی' },
            ],
            correctAnswer: 'c1b',
        },
        {
            id: 'q2',
            text: 'پدر روانشناسی مدرن کیست؟',
            type: 'single-choice',
            priority: 2,
            choices: [
                { id: 'c2a', text: 'زیگموند فروید' },
                { id: 'c2b', text: 'بی.اف. اسکینر' },
                { id: 'c2c', text: 'ویلهلم وونت' },
                { id: 'c2d', text: 'کارل راجرز' },
            ],
            correctAnswer: 'c2c',
        },
        {
            id: 'q3',
            text: 'کدام بخش از مغز مسئول پردازش احساسات، به ویژه ترس است؟',
            type: 'single-choice',
            priority: 3,
            choices: [
                { id: 'c3a', text: 'قشر پیش‌پیشانی' },
                { id: 'c3b', text: 'هیپوکامپ' },
                { id: 'c3c', text: 'آمیگدال' },
                { id: 'c3d', text: 'تالاموس' },
            ],
            correctAnswer: 'c3c',
        },
        {
            id: 'q4',
            text: 'نظریه سلسله مراتب نیازهای مزلو شامل کدام یک از موارد زیر است؟',
            type: 'multi-choice',
            priority: 4,
            choices: [
                { id: 'c4a', text: 'نیازهای فیزیولوژیکی' },
                { id: 'c4b', text: 'نیاز به امنیت' },
                { id: 'c4c', text: 'نیاز به خودشکوفایی' },
                { id: 'c4d', text: 'نیاز به قدرت' },
            ],
            correctAnswer: ['c4a', 'c4b', 'c4c'],
        },
        {
            id: 'q5',
            text: 'شرطی‌سازی کلاسیک توسط کدام روانشناس معرفی شد؟',
            type: 'single-choice',
            priority: 5,
            choices: [
                { id: 'c5a', text: 'ایوان پاولف' },
                { id: 'c5b', text: 'جان واتسون' },
                { id: 'c5c', text: 'آلبرت بندورا' },
                { id: 'c5d', text: 'ژان پیاژه' },
            ],
            correctAnswer: 'c5a',
        },
    ],
};

const MOCK_SESSIONS: TrophySession[] = [
    {
        id: 'session-a',
        title: 'آشنایی با روان‌درمانی',
        description: 'جلسه اول: معرفی روش‌ها و اهداف درمان',
        slug: 'therapy-intro', // This slug must match the one in sessions/[slug]/route.ts
        contents: [],
        status:"viewed"
    },
    {
        id: 'session-b',
        title: 'درک اضطراب و مدیریت آن',
        description: 'جلسه دوم: شناخت اضطراب و تمرین‌های آرام‌سازی',
        slug: 'anxiety-management', // This slug must match
        contents: [],
        status:"viewed"
    },
    {
        id: 'session-c',
        title: 'تقویت عزت‌نفس',
        description: 'جلسه سوم: خودشناسی و پذیرش خود',
        slug: 'self-esteem', // This slug must match
        contents: [],
        status:"viewed"
    },
    {
        id: 'session-d',
        title: 'مدیریت روابط بین‌فردی',
        description: 'جلسه چهارم: مهارت‌های ارتباط مؤثر',
        slug: 'relationships', // This slug must match
        contents: [],
        status:"open"
    },
    {
        id: 'session-e',
        title: 'تنفس و آرام‌سازی ذهن',
        description: 'جلسه پنجم: تمرین‌های تنفس عمیق و ذهن‌آگاهی',
        slug: 'mindfulness', // This slug must match
        contents: [],
        status:"locked"
    },
    {
        id: 'session-f',
        title: 'کنترل خشم و احساسات',
        description: 'جلسه ششم: مدیریت واکنش‌های هیجانی',
        slug: 'emotion-regulation', // This slug must match
        contents: [],
        status:"locked"
    },
    {
        id: 'session-g',
        title: 'یادگیری رفتارهای سالم',
        description: 'جلسه هفتم: جایگزین‌سازی عادات منفی',
        slug: 'healthy-habits', // This slug must match
        contents: [],
        status:"locked"
    },
    {
        id: 'session-h',
        title: 'مرور و جمع‌بندی مسیر درمان',
        description: 'جلسه هشتم: مرور پیشرفت‌ها و برنامه ادامه درمان',
        slug: 'therapy-review', // This slug must match
        contents: [],
        status:"locked"

    },
];

export async function GET() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
        unfinishedExam: MOCK_UNFINISHED_EXAM,
        sessions: MOCK_SESSIONS,
        userName: "نیوشا رضایی",
        hasUnfinishedExam: true, // This can be dynamic based on user data
    });
}
