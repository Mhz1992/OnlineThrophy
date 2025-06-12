'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/skeleton';
import { PerformanceCard } from '@/features/performance/components/PerformanceCard';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartJSTooltip,
    Legend,
    TooltipItem,
    ScriptableContext,
    Scale,
    CoreScaleOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {danaFont} from "@/lib/utils";
import { usePerformanceData } from '@/features/performance/api/hook'; // Import the new hook
import { PerformanceApiResponse } from '@/features/performance/api/types.d'; // Import the specific type

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ChartJSTooltip,
    Legend
);

// Hardcoded color values based on common theme defaults
const PRIMARY_COLOR = '#1F95EB';
const FOREGROUND_COLOR = '#020817';
const BACKGROUND_COLOR = '#FFFFFF';
const BORDER_COLOR = '#E2E8F0';

// Set global font and color for Chart.js
if (ChartJS.defaults.font.family !== danaFont.style.fontFamily) {
    ChartJS.defaults.font.family = danaFont.style.fontFamily;
}
ChartJS.defaults.color = FOREGROUND_COLOR; // Default text color for chart elements

// Helper function to get Persian month name for chart X-axis
const getPersianMonthName = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('fa-IR', { month: 'long' }).format(date);
};

export default function PerformancePage() {
    // Use the new usePerformanceData hook
    const { data, isLoading, isError } = usePerformanceData();

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <h1 className="text-2xl font-bold">خطا در بارگذاری عملکرد!</h1>
                <p className="text-gray-600 mt-2">متاسفانه مشکلی در دریافت اطلاعات عملکرد پیش آمده است.</p>
            </div>
        );
    }

    const performanceEntries = data?.data || [];

    // Prepare data for Chart.js
    const sortedEntries = performanceEntries.sort((a, b) => a.timestamp - b.timestamp);

    const chartLabels = sortedEntries.map((entry) => getPersianMonthName(entry.timestamp));
    const chartScores = sortedEntries.map((entry) => entry.score);

    const chartJsData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'امتیاز',
                data: chartScores,
                borderColor: PRIMARY_COLOR, // Hardcoded primary color
                backgroundColor: (context: ScriptableContext<'line'>) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return;
                    }

                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'transparent'); // Start transparent at the bottom
                    gradient.addColorStop(1, 'rgba(31, 149, 235, 0.2)'); // Hardcoded primary color with 20% opacity

                    return gradient;
                },
                fill: true, // Enable fill for the area under the line
                tension: 0.4, // Smooth curve
                pointRadius: 5,
                pointBackgroundColor: PRIMARY_COLOR, // Hardcoded primary color
                pointBorderColor: BACKGROUND_COLOR, // Hardcoded background color
                pointBorderWidth: 2,
                pointHoverRadius: 7,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: function(context: TooltipItem<'line'>[]) {
                        return context[0].label; // Month name
                    },
                    label: function(context: TooltipItem<'line'>) {
                        const entryIndex = context.dataIndex;
                        const originalEntry = sortedEntries[entryIndex];
                        const formattedDate = new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(originalEntry.timestamp));
                        // Format score to Persian number
                        const persianScore = new Intl.NumberFormat('fa-IR').format(originalEntry.score);
                        return `${originalEntry.title} - امتیاز: ${persianScore} (${formattedDate})`;
                    }
                },
                backgroundColor: BACKGROUND_COLOR, // Hardcoded background color
                borderColor: BORDER_COLOR, // Hardcoded border color
                borderWidth: 1,
                titleColor: FOREGROUND_COLOR, // Hardcoded foreground color
                bodyColor: FOREGROUND_COLOR, // Hardcoded foreground color
                padding: 10,
                cornerRadius: 8,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    borderColor: BORDER_COLOR, // Hardcoded border color
                },
                ticks: {
                    color: FOREGROUND_COLOR, // Hardcoded foreground color
                },
            },
            y: {
                grid: {
                    borderColor: BORDER_COLOR, // Hardcoded border color
                    color: BORDER_COLOR, // Hardcoded border color
                },
                ticks: {
                    color: FOREGROUND_COLOR, // Hardcoded foreground color
                    // Format Y-axis numbers to Persian
                    callback: function(this: Scale<CoreScaleOptions>, value: string | number) {
                        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
                        return new Intl.NumberFormat('fa-IR').format(numericValue);
                    }
                },
                beginAtZero: true, // Start Y-axis from 0
            },
        },
    };

    return (
        <div className="flex flex-col h-full pt-4">
            <h1 className="text-2xl font-bold text-right mb-4">حساب من</h1>
            <div className="border-b border-gray-200 dark:border-gray-700 "></div>

            <div className="flex-grow overflow-y-auto">
                <h2 className="text-xl font-semibold text-right py-4">نمودار عملکرد</h2>
                <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 mb-8">
                    {isLoading ? (
                        <Skeleton className="w-full h-full rounded-lg" />
                    ) : performanceEntries.length > 0 ? (
                        <Line data={chartJsData} options={chartOptions} />
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            هیچ داده عملکردی برای نمایش نمودار وجود ندارد.
                        </p>
                    )}
                </div>

                <h2 className="text-xl font-semibold text-right mb-4">جزئیات عملکرد</h2>
                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                            <Card key={index} className="my-2">
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-1/4" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {performanceEntries.length > 0 ? (
                            performanceEntries.map((entry) => (
                                <PerformanceCard
                                    key={entry.id}
                                    title={entry.title}
                                    score={entry.score}
                                    timestamp={entry.timestamp}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-600 dark:text-gray-400">
                                هیچ داده عملکردی برای نمایش وجود ندارد.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
