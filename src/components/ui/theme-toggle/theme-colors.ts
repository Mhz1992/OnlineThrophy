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
            info:'#F2FAFF',
            'info-foreground' : "#1F95EB",
            secondary: '#ffffff',
            'secondary-foreground': '#4F4B45',
            muted: '#EDE6DA',
            'muted-foreground': '#81807D',
            accent: '#E5E1D7',
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
            background: '#0CFF00',
            foreground: '#BEB9AE',
            card: '#00FF15',
            'card-foreground': '#F9F7F1',
            popover: '#707000',
            'popover-foreground': '#E4E3D7',
            primary: '#FF4200',
            'primary-foreground': '#FFFFFF',
            secondary: '#FFAA00',
            'secondary-foreground': '#2F2F2E',
            muted: '#1A1A19',
            'muted-foreground': '#B1ACA2',
            accent: '#AAFF00',
            'accent-foreground': '#F2EEE3',
            destructive: '#F63131',
            'destructive-foreground': '#FFFFFF',
            border: '#0064FF',
            input: '#AA00FF',
            ring: '#208CE1',
            'chart-1': '#B34F32',
            'chart-2': '#C6AAFA',
            'chart-3': '#1A1916',
            'chart-4': '#2B2239',
            'chart-5': '#B44B2D',
            sidebar: '#FF0064',
            'sidebar-foreground': '#BEB9AE',
            'sidebar-primary': '#343434',
            'sidebar-primary-foreground': '#FBFBFB',
            'sidebar-accent': '#0E0E0D',
            'sidebar-accent-foreground': '#BEB9AE',
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
            // New toast colors for dark theme
            'toast-success-bg': '#1E392A', // Darker green
            'toast-success-foreground': '#A7F3D0', // Lighter green text
            'toast-error-bg': '#4C1A1F', // Darker red
            'toast-error-foreground': '#FCA5A5', // Lighter red text
            'toast-warning-bg': '#4C3B00', // Darker yellow
            'toast-warning-foreground': '#FDE68A', // Lighter yellow text
            'toast-info-bg': '#1A3642', // Darker blue
            'toast-info-foreground': '#A7D9F0', // Lighter blue text
        },
    },
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
