import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    useColorScheme,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

interface GlassButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'danger';
}

export const GlassButton: React.FC<GlassButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    variant = 'primary',
}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary':
                return Colors.accent.primary;
            case 'danger':
                return Colors.accent.danger;
            default:
                return isDark ? Colors.dark.card : Colors.light.card;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: isDark ? Colors.dark.border : Colors.light.border,
                    shadowColor: isDark ? Colors.dark.shadow : Colors.light.shadow,
                },
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.8}>
            <Text
                style={[
                    styles.text,
                    {
                        color: variant === 'secondary' ? (isDark ? Colors.dark.text : Colors.light.text) : '#FFFFFF',
                    },
                    textStyle,
                ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: Typography.sizes.base,
        fontWeight: '600',
    },
});
