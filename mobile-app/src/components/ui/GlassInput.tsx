import React from 'react';
import {
    TextInput,
    StyleSheet,
    ViewStyle,
    TextStyle,
    useColorScheme,
    View,
    Text,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

interface GlassInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    style?: ViewStyle;
    label?: string;
}

export const GlassInput: React.FC<GlassInputProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    style,
    label,
}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <View style={[styles.container, style]}>
            {label && (
                <Text
                    style={[
                        styles.label,
                        { color: isDark ? Colors.dark.text : Colors.light.text },
                    ]}>
                    {label}
                </Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                        borderColor: isDark ? Colors.dark.border : Colors.light.border,
                        color: isDark ? Colors.dark.text : Colors.light.text,
                    },
                ]}
                placeholder={placeholder}
                placeholderTextColor={
                    isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
                }
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: Typography.sizes.sm,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        borderRadius: 12,
        borderWidth: 1,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: Typography.sizes.base,
    },
});
