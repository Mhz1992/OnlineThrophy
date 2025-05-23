import { Dispatch, SetStateAction } from 'react';

export const animateProgress = (
    initialProgress: number,
    targetProgress: number,
    setProgress: Dispatch<SetStateAction<number>>,
): void => {
    let currentProgress = initialProgress;
    const step = (): void => {
        if (currentProgress < targetProgress) {
            const increment = Math.min((targetProgress - currentProgress) * 0.1, 1);
            currentProgress += increment;
            setProgress(currentProgress);

            if (currentProgress < targetProgress) {
                requestAnimationFrame(step);
            }
        }
    };
    requestAnimationFrame(step);
};
