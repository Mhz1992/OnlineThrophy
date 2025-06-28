export type Slug = string;
export type UniqueId = string;
export type Timestamp = number;


export interface Choice {
    id: UniqueId;
    text: string;
    priority: number;
}

export interface Question {
    id: UniqueId;
    text: string;
    type: string;
    priority: number;
    choices?: Choice[];
    correctAnswer?: string | string[];
}

export interface Exam {
    id: UniqueId;
    slug: Slug;
    title: string;
    description: string;
    questions: Question[];
    durationMinutes: number;
}

export interface ExamAnswer {
    questionId: UniqueId;
    answer: string | string[];
}

export interface ExamSubmission {
    examId: UniqueId;
    answers: ExamAnswer[];
    timeTakenSeconds: number;
    submittedAt: Timestamp;
}

export interface ExamResult {
    examId: UniqueId;
    score: number;
    timeTakenSeconds: number;
    correctAnswersCount: number;
    totalQuestions: number;
    answerBreakdown: {
        questionId: UniqueId;
        isCorrect: boolean;
        submittedAnswer: string | string[];
        correctAnswer: string | string[];
    }[];
    submittedAt: Timestamp;
}

export type ContentType = 'text' | 'image' | 'video' | 'link' | 'voice';


export interface SessionContent {
    id: UniqueId;
    type: ContentType;
    value: string;
    title?: string;
    description?: string;
    link?: string;
}

export interface TrophySession {
    id: UniqueId;
    slug: Slug;
    title: string;
    description: string;
    contents: SessionContent[];
    status: SessionStatus; // Added status property
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface ListApiResponse<T> {
    data: T[];
    success: boolean;
    message?: string;
    total: number;
}

// --- API Return Types ---
export interface HomeApiResponse {
    unfinishedExam: Exam;
    sessions: TrophySession[];
    userName: string;
    hasUnfinishedExam: boolean;
}

// Exam details API returns an Exam object directly
// Session details API returns a TrophySession object directly

// --- Mock Data Types ---
export type MockExamData = Record<Slug, Exam>;
export type MockSessionData = Record<Slug, TrophySession>;

// New types for Performance Page
export interface PerformanceEntry {
    id: UniqueId;
    title: string;
    score: number;
    timestamp: Timestamp; // Epoch time in milliseconds
}

export interface PerformanceApiResponse {
    data: PerformanceEntry[];
    success: boolean;
    message?: string;
}
