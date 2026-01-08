import React from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

export const ProfileScreen = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => dispatch(logout()),
                },
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                    Profile
                </Text>
            </View>

            <View style={styles.content}>
                <View style={styles.section}>
                    <GlassCard>
                        <View style={styles.cardContent}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </Text>
                            </View>
                            <Text style={[styles.name, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                                {user?.name || 'User'}
                            </Text>
                            <Text style={[styles.email, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                                {user?.email || 'user@example.com'}
                            </Text>
                        </View>
                    </GlassCard>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                        ABOUT IKYKIK
                    </Text>
                    <GlassCard>
                        <View style={styles.cardContent}>
                            <Text style={[styles.aboutText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                                IKYKIK helps you manage tasks with a unique reward system. Complete tasks to unlock your favorite apps!
                            </Text>
                            <View style={styles.featureList}>
                                <Text style={[styles.feature, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                                    ✓ Smart task management
                                </Text>
                                <Text style={[styles.feature, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                                    ✓ Productivity analytics
                                </Text>
                                <Text style={[styles.feature, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                                    ✓ App usage rewards
                                </Text>
                                <Text style={[styles.feature, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                                    ✓ Harsh motivation 💀
                                </Text>
                            </View>
                        </View>
                    </GlassCard>
                </View>

                <View style={styles.logoutContainer}>
                    <GlassButton
                        title="Logout"
                        onPress={handleLogout}
                        variant="danger"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
        paddingTop: 60,
    },
    title: {
        fontSize: Typography.sizes.xxl,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
        paddingTop: 0,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: Typography.sizes.xs,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },
    cardContent: {
        padding: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.accent.primary,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    name: {
        fontSize: Typography.sizes.xl,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 4,
    },
    email: {
        fontSize: Typography.sizes.md,
        textAlign: 'center',
    },
    aboutText: {
        fontSize: Typography.sizes.md,
        lineHeight: 22,
        marginBottom: 16,
    },
    featureList: {
        gap: 8,
    },
    feature: {
        fontSize: Typography.sizes.sm,
    },
    logoutContainer: {
        marginTop: 16,
    },
});
