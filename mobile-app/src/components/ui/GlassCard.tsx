import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../theme/colors';

interface GlassCardProps {
    children: ReactNode;
    style?: ViewStyle;
    priority?: 'high' | 'medium' | 'low';
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    style,
    priority,
}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const priorityBorderColor = priority
        ? Colors.priority[priority]
        : 'transparent';

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                    borderColor: isDark ? Colors.dark.border : Colors.light.border,
                    shadowColor: isDark ? Colors.dark.shadow : Colors.light.shadow,
                    borderLeftColor: priorityBorderColor,
                    borderLeftWidth: priority ? 4 : 0,
                },
                style,
            ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 16,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 32,
        elevation: 8,
    },
});
