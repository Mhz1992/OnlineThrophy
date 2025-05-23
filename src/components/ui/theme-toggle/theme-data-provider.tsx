'use client';
import setGlobalColorTheme, { ThemeColors } from './theme-colors'; // Import ThemeColors type
import { useTheme } from 'next-themes';
import { ThemeProviderProps } from 'next-themes';
import React, {createContext, JSX, useContext, useEffect, useState} from 'react';

// Define the interface for the context value
interface ThemeColorStateParams {
    themeColor: ThemeColors;
    setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}

const ThemeContext = createContext<ThemeColorStateParams>({} as ThemeColorStateParams);

export default function ThemeDataProvider({ children }: ThemeProviderProps): JSX.Element | null {
    const getSavedThemeColor = (): ThemeColors => {
        try {
            // Default to 'primary' as it's the only key in the 'themes' object in theme-colors.ts
            return (localStorage.getItem('themeColor') as ThemeColors) || 'primary';
        } catch {
            return 'primary' as ThemeColors;
        }
    };

    const [themeColor, setThemeColor] = useState<ThemeColors>(getSavedThemeColor());
    const [isMounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme(); // Use resolvedTheme, which is always 'light' or 'dark' when enableSystem is false

    useEffect(() => {
        // Ensure resolvedTheme is available before attempting to set the theme
        if (resolvedTheme) {
            setGlobalColorTheme(resolvedTheme as 'light' | 'dark', themeColor);
        }

        if (!isMounted) {
            setIsMounted(true);
        }
    }, [themeColor, resolvedTheme, isMounted]); // Depend on resolvedTheme

    if (!isMounted) {
        return null;
    }
    return <ThemeContext.Provider value={{ themeColor, setThemeColor }}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeColorStateParams {
    return useContext(ThemeContext);
}
