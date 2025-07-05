const themes = {
    primary: { // Translated from Primary
        light: {
            background: '#f9faf9',
            foreground: '#3D3829',
            card: '#F9F7F1',
            'card-foreground': '#131312',
            popover: '#FFFFFF',
            'popover-foreground': '#27231B',
            primary: '#1F95EB', // HSL: 15.11 55.56% 52.35%
            'primary-foreground': '#FFFFFF',
            info: '#F2FAFF',
            'info-foreground': "#1F95EB",
            secondary: '#ffffff',
            'secondary-foreground': '#4F4B45',
            muted: '#EDE6DA',
            'muted-foreground': '#81807D',
            accent: '#8bc0e7',
            'accent-foreground': '#27231B',
            destructive: '#131312',
            'destructive-foreground': '#FFFFFF',
            border: '#D8D5CD',
            input: '#AEAA9F',
            ring: '#208CE1',
            'chart-1': '#B34F32',
            'chart-2': '#C6AAFA',
            'chart-3': '#D7CEBE',
            'chart-4': '#E3D7F0',
            'chart-5': '#B44B2D',
            sidebar: '#f1efef',
            'sidebar-foreground': '#3B3B39',
            'sidebar-primary': '#C96442',
            'sidebar-primary-foreground': '#FBFBFB',
            'sidebar-accent': '#E5E1D7',
            'sidebar-accent-foreground': '#343434',
            'sidebar-border': '#EBEBEB',
            'sidebar-ring': '#B5B5B5',
            radius: '0.5rem',
            'shadow-2xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
            'shadow-xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
            'shadow-sm': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
            shadow: '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
            'shadow-md': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)',
            'shadow-lg': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)',
            'shadow-xl': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)',
            'shadow-2xl': '0 1px 3px 0px hsl(0 0% 0% / 0.25)',
            // New toast colors for light theme
            'toast-success-bg': '#D4EDDA', // Light green
            'toast-success-foreground': '#155724', // Dark green text
            'toast-error-bg': '#F8D7DA', // Light red
            'toast-error-foreground': '#721C24', // Dark red text
            'toast-warning-bg': '#FFF3CD', // Light yellow
            'toast-warning-foreground': '#856404', // Dark yellow text
            'toast-info-bg': '#D1ECF1', // Light blue
            'toast-info-foreground': '#0C5460', // Dark blue text
        },
        dark: {
            background: '#1C1C1C',
            foreground: '#F1F1F1',
            card: '#f4f3f3',
            'card-foreground': '#0e0e0e',
            popover: '#2A2A2A',
            'popover-foreground': '#F5F5F5',
            primary: '#1F95EB',
            'primary-foreground': '#FFFFFF',
            info: '#b8b8b8',
            'info-foreground': '#A3D9FF',
            secondary: '#2E2E2E',
            'secondary-foreground': '#E0E0E0',
            muted: '#3A3A3A',
            'muted-foreground': '#B0B0B0',
            accent: '#3399CC',
            'accent-foreground': '#FFFFFF',
            destructive: '#FF5C5C',
            'destructive-foreground': '#FFFFFF',
            border: '#3C3C3C',
            input: '#555555',
            ring: '#208CE1',
            'chart-1': '#FF9A8B',
            'chart-2': '#A088FF',
            'chart-3': '#C4BA9E',
            'chart-4': '#C0A9DA',
            'chart-5': '#FF7F66',
            sidebar: '#1F1F1F',
            'sidebar-foreground': '#EAEAEA',
            'sidebar-primary': '#E07854',
            'sidebar-primary-foreground': '#1C1C1C',
            'sidebar-accent': '#3A3A3A',
            'sidebar-accent-foreground': '#E5E5E5',
            'sidebar-border': '#333333',
            'sidebar-ring': '#666666',
            radius: '0.5rem',
            'shadow-2xs': '0 1px 3px 0px hsl(0 0% 100% / 0.05)',
            'shadow-xs': '0 1px 3px 0px hsl(0 0% 100% / 0.05)',
            'shadow-sm': '0 1px 3px 0px hsl(0 0% 100% / 0.10), 0 1px 2px -1px hsl(0 0% 100% / 0.10)',
            shadow: '0 1px 3px 0px hsl(0 0% 100% / 0.10), 0 1px 2px -1px hsl(0 0% 100% / 0.10)',
            'shadow-md': '0 1px 3px 0px hsl(0 0% 100% / 0.10), 0 2px 4px -1px hsl(0 0% 100% / 0.10)',
            'shadow-lg': '0 1px 3px 0px hsl(0 0% 100% / 0.10), 0 4px 6px -1px hsl(0 0% 100% / 0.10)',
            'shadow-xl': '0 1px 3px 0px hsl(0 0% 100% / 0.10), 0 8px 10px -1px hsl(0 0% 100% / 0.10)',
            'shadow-2xl': '0 1px 3px 0px hsl(0 0% 100% / 0.25)',
            // Toasts for dark mode
            'toast-success-bg': '#2E4738', // Dark green
            'toast-success-foreground': '#C8F5D0',
            'toast-error-bg': '#502B2B',
            'toast-error-foreground': '#FBC7C7',
            'toast-warning-bg': '#4E4A2F',
            'toast-warning-foreground': '#F5EBA8',
            'toast-info-bg': '#274B5E',
            'toast-info-foreground': '#D0F0FF',
        }
    }
};

export type ThemeColors = keyof typeof themes;

export default function setGlobalColorTheme(themeMode: 'dark' | 'light' | 'system', color: ThemeColors): void {
    const themeEnv = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const theme = themes[color][themeMode === 'system' ? themeEnv : themeMode] as {
        [key: string]: string;
    };
    const doc = document.documentElement;
    const innerDoc = document.querySelector('iframe')?.contentDocument?.documentElement;
    localStorage.setItem('themeColor', color);

    for (const key in theme) {
        if (doc) {
            doc.style.setProperty(`--${key}`, theme[key]);
        }
        if (innerDoc) {
            innerDoc.style.setProperty(`--${key}`, theme[key]);
        }
    }
}
