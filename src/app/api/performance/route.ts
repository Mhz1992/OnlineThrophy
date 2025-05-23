import { NextResponse } from 'next/server';
import { PerformanceEntry, PerformanceApiResponse } from '@/types/api';

const MOCK_PERFORMANCE_DATA: PerformanceEntry[] = [
    {
        id: 'perf1',
        title: 'آزمون ریاضی فصل ۱',
        score: 85,
        timestamp: new Date('2023-01-15T10:00:00Z').getTime(),
    },
    {
        id: 'perf2',
        title: 'آزمون فیزیک مبحث نور',
        score: 72,
        timestamp: new Date('2023-02-20T11:30:00Z').getTime(),
    },
    {
        id: 'perf3',
        title: 'آزمون شیمی دوره ای',
        score: 91,
        timestamp: new Date('2023-03-05T09:00:00Z').getTime(),
    },
    {
        id: 'perf4',
        title: 'آزمون ادبیات فارسی',
        score: 68,
        timestamp: new Date('2023-04-10T14:00:00Z').getTime(),
    },
    {
        id: 'perf5',
        title: 'آزمون زیست شناسی',
        score: 78,
        timestamp: new Date('2023-05-25T16:00:00Z').getTime(),
    },
    {
        id: 'perf6',
        title: 'آزمون جامع اول',
        score: 88,
        timestamp: new Date('2023-06-01T10:00:00Z').getTime(),
    },
];

export async function GET() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json<PerformanceApiResponse>({
        data: MOCK_PERFORMANCE_DATA,
        success: true,
        message: 'Performance data fetched successfully',
    });
}
