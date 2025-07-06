'use client';

import React from 'react';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {Skeleton} from '@/components/skeleton';
import {PerformanceCard} from '@/features/performance/components/PerformanceCard';
import {
    CategoryScale,
    Chart as ChartJS,
    CoreScaleOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Scale,
    ScriptableContext,
    Title,
    Tooltip as ChartJSTooltip,
    TooltipItem,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {danaFont} from "@/lib/utils";
import {usePerformanceQuery} from "@/features/performance/api/hooks";
import {getPersianDate} from "@/core/utils/getPersianDate";

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

// Helper function to get CSS variable values
const getCssVariable = (variableName: string, fallback: string) => {
    if (typeof window !== 'undefined') {
        const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
        return value || fallback;
    }
    return fallback; // Fallback for SSR or if variable not found
};

export default function PerformancePage() {

    // State to store dynamic colors, initialized with sensible defaults
    const colors = {
        primary: getCssVariable('--primary', '#1F95EB'),
        foreground: getCssVariable('--foreground', '#020817'),
        background: getCssVariable('--background', '#FFFFFF'),
        border: getCssVariable('--border', '#E2E8F0'),
    };

    if (ChartJS.defaults.font.family !== danaFont.style.fontFamily) {
        ChartJS.defaults.font.family = danaFont.style.fontFamily;
    }
    ChartJS.defaults.color = colors.foreground; // Update default text color for chart elements

    const {data, isLoading, isError} = usePerformanceQuery();

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <h1 className="text-2xl font-bold">خطا در بارگذاری عملکرد!</h1>
                <p className="text-gray-600 mt-2">متاسفانه مشکلی در دریافت اطلاعات عملکرد پیش آمده است.</p>
            </div>
        );
    }

    const performanceEntries = data || [];

    // Prepare data for Chart.js
    const sortedEntries = performanceEntries.sort((a, b) => a.inserted_dt - b.inserted_dt);

    const chartLabels = sortedEntries.map((entry) => getPersianDate(entry.inserted_dt));
    const chartScores = sortedEntries.map((entry) => entry.score);

    const chartJsData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'امتیاز',
                data: chartScores,
                borderColor: colors.primary, // Use dynamic primary color
                backgroundColor: (context: ScriptableContext<'line'>) => {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;

                    if (!chartArea) {
                        return;
                    }

                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'transparent'); // Start transparent at the bottom
                    // Use dynamic primary color with 20% opacity (hex alpha '33')
                    gradient.addColorStop(1, `${colors.primary}33`);

                    return gradient;
                },
                fill: true, // Enable fill for the area under the line
                tension: 0.4, // Smooth curve
                pointRadius: 5,
                pointBackgroundColor: colors.primary, // Use dynamic primary color
                pointBorderColor: colors.background, // Use dynamic background color
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
                    title: function (context: TooltipItem<'line'>[]) {
                        return context[0].label; // Month name
                    },
                    label: function (context: TooltipItem<'line'>) {
                        const entryIndex = context.dataIndex;
                        const originalEntry = sortedEntries[entryIndex];
                        const formattedDate = new Intl.DateTimeFormat('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }).format(new Date(originalEntry.inserted_dt));
                        // Format score to Persian number
                        const persianScore = new Intl.NumberFormat('fa-IR').format(originalEntry.score);
                        return `${originalEntry.exam_type_title} - امتیاز: ${persianScore} (${formattedDate})`;
                    }
                },
                backgroundColor: colors.background, // Use dynamic background color
                borderColor: colors.border, // Use dynamic border color
                borderWidth: 1,
                titleColor: colors.foreground, // Use dynamic foreground color
                bodyColor: colors.foreground, // Use dynamic foreground color
                padding: 10,
                cornerRadius: 8,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    borderColor: colors.border, // Use dynamic border color
                },
                ticks: {
                    color: colors.foreground, // Use dynamic foreground color
                },
            },
            y: {
                grid: {
                    borderColor: colors.border, // Use dynamic border color
                    color: colors.border, // Use dynamic border color
                },
                ticks: {
                    color: colors.foreground, // Use dynamic foreground color
                    // Format Y-axis numbers to Persian
                    callback: function (this: Scale<CoreScaleOptions>, value: string | number) {
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
                <div
                    className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 mb-8">
                    {isLoading ? (
                        <Skeleton className="w-full h-full rounded-lg"/>
                    ) : performanceEntries.length > 0 ? (
                        <Line data={chartJsData} options={chartOptions}/>
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
                                    <Skeleton className="h-6 w-3/4 mb-2"/>
                                    <Skeleton className="h-4 w-1/2"/>
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-1/4"/>
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
                                    title={entry.exam_type_title}
                                    score={entry.score}
                                    timestamp={entry.inserted_dt}
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
