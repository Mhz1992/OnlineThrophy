import { NextResponse } from 'next/server';
import { Exam, TrophySession } from '@/types/api';

const MOCK_UNFINISHED_EXAM: Exam = {
    id: 'exam-123',
    title: 'آزمون ریاضی فصل اول',
    description: 'یک آزمون تستی برای ارزیابی دانش ریاضی شما.',
    durationMinutes: 45,
    slug: 'math-chapter-1',
    questions: [],
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
