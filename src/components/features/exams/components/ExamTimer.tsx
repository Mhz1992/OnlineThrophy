import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/src/lib/utils';

interface ExamTimerProps {
    durationMinutes: number;
    onTimerEnd: () => void;
    onTick?: (secondsRemaining: number) => void; // Callback for every second
}

const ExamTimer: React.FC<ExamTimerProps> = ({ durationMinutes, onTimerEnd, onTick }) => {
    const [timeRemaining, setTimeRemaining] = useState(durationMinutes * 60); // in seconds
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isFirstRender = useRef(true); // Ref to track first render

    // Refs to hold the latest callbacks without triggering useEffect re-runs
    const onTimerEndRef = useRef(onTimerEnd);
    const onTickRef = useRef(onTick);

    // Update the refs whenever the props change
    useEffect(() => {
        onTimerEndRef.current = onTimerEnd;
    }, [onTimerEnd]);

    useEffect(() => {
        onTickRef.current = onTick;
    }, [onTick]);

    useEffect(() => {
        // Clear any existing timer on component mount or duration change
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        setTimeRemaining(durationMinutes * 60); // Reset time on duration change

        timerRef.current = setInterval(() => {
            setTimeRemaining(prevTime => {
                const newTime = prevTime - 1;
                if (newTime <= 0) {
                    clearInterval(timerRef.current!);
                    onTimerEndRef.current(); // Use ref for callback
                    return 0;
                }
                return newTime;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [durationMinutes]); // Only durationMinutes is a dependency now

    // New useEffect to call onTick when timeRemaining changes, but not on the very first render
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Skip calling onTick on the initial render
        }
        onTickRef.current?.(timeRemaining); // Use ref for callback
    }, [timeRemaining]); // Only timeRemaining is a dependency now

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const isWarning = timeRemaining <= 60; // Less than 1 minute remaining

    return (
        <div
            className={cn(
                'font-mono text-lg font-semibold px-3 py-1 rounded-md',
                isWarning ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
            )}
        >
            Time: {formattedTime}
        </div>
    );
};

export default ExamTimer;
