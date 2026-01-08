// IKYKIK Color Palette

export const Colors = {
    light: {
        background: '#F2F2F7',
        card: '#FFFFFF',
        text: '#000000',
        textSecondary: '#8E8E93',
        border: '#C6C6C8',
        shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
        background: '#000000',
        card: '#1C1C1E',
        text: '#FFFFFF',
        textSecondary: '#8E8E93',
        border: '#38383A',
        shadow: 'rgba(255, 255, 255, 0.1)',
    },
    accent: {
        primary: '#007AFF',
        secondary: '#5856D6',
        success: '#34C759',
        warning: '#FF9500',
        danger: '#FF3B30',
    },
    success: '#34C759',
    warning: '#FF9500',
    error: {
        primary: '#FF3B30',
        secondary: '#FF6961',
    },
    priority: {
        high: '#FF3B30',
        medium: '#FF9500',
        low: '#34C759',
    },
};

export type ColorScheme = 'light' | 'dark';
