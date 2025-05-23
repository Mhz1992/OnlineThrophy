'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toggle } from './toggle';

export const ModeToggle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    const { setTheme, theme } = useTheme();

    return (
        <div ref={ref} {...props}>
            <Toggle
                variant="outline"
                className="group size-10 border-border data-[state=on]:bg-background"
                pressed={theme === 'dark'}
                onPressedChange={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                <Moon
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 scale-0 text-primary opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
                    aria-hidden="true"
                />
                <Sun
                    size={16}
                    strokeWidth={2}
                    className="absolute shrink-0 scale-100 text-primary opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
                    aria-hidden="true"
                />
            </Toggle>
        </div>
    );
});
ModeToggle.displayName = 'ModeToggle';
