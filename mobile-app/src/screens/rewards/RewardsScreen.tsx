import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, useColorScheme, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { rewardService } from '../../services/api';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

export const RewardsScreen = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { user } = useSelector((state: RootState) => state.auth);

    const [rewards, setRewards] = useState<any[]>([]);

    useEffect(() => {
        loadRewards();
    }, []);

    const loadRewards = async () => {
        if (!user) return;

        try {
            const data = await rewardService.getRewards(user._id);
            setRewards(data);
        } catch (error) {
            console.error('Error loading rewards:', error);
        }
    };

    const handleUnlock = async (rewardId: string, appName: string) => {
        if (!user) return;

        try {
            const result = await rewardService.unlockApp(user._id, rewardId);
            Alert.alert('Success!', result.message);
            await loadRewards();
        } catch (error: any) {
            Alert.alert('Cannot Unlock', error.response?.data?.message || 'Complete at least 1 task today to unlock!');
        }
    };

    const renderReward = ({ item }: any) => (
        <View style={styles.rewardContainer}>
            <GlassCard>
                <View style={styles.rewardContent}>
                    <View style={styles.rewardHeader}>
                        <Text style={[styles.appName, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                            {item.appName}
                        </Text>
                        {item.isLocked ? (
                            <View style={styles.lockedBadge}>
                                <Text style={styles.lockedText}>🔒 LOCKED</Text>
                            </View>
                        ) : (
                            <View style={styles.unlockedBadge}>
                                <Text style={styles.unlockedText}>✓ UNLOCKED</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: `${((item.dailyLimit - (item.usageToday || 0)) / item.dailyLimit) * 100}%`,
                                        backgroundColor: item.isLocked ? Colors.error.primary : Colors.success,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={[styles.progressText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                            {item.remainingMinutes || item.dailyLimit - (item.usageToday || 0)} / {item.dailyLimit} min remaining
                        </Text>
                    </View>

                    {item.isLocked && (
                        <View style={styles.actionContainer}>
                            <GlassButton
                                title="Unlock (Complete Task)"
                                onPress={() => handleUnlock(item._id, item.appName)}
                                variant="primary"
                            />
                        </View>
                    )}
                </View>
            </GlassCard>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                    Rewards
                </Text>
                <Text style={[styles.subtitle, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                    Manage your reward apps (30 min/day)
                </Text>
            </View>

            <FlatList
                data={rewards}
                renderItem={renderReward}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={[styles.emptyText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                            No reward apps added yet
                        </Text>
                        <Text style={[styles.emptySubtext, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                            Add apps like Instagram or COD to limit usage to 30 min/day
                        </Text>
                    </View>
                }
            />
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
        marginBottom: 4,
    },
    subtitle: {
        fontSize: Typography.sizes.md,
    },
    list: {
        padding: 16,
        paddingTop: 0,
    },
    rewardContainer: {
        marginBottom: 16,
    },
    rewardContent: {
        padding: 16,
    },
    rewardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    appName: {
        fontSize: Typography.sizes.lg,
        fontWeight: '600',
    },
    lockedBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'rgba(255, 59, 48, 0.2)',
        borderRadius: 12,
    },
    lockedText: {
        color: '#FF3B30',
        fontSize: 12,
        fontWeight: 'bold',
    },
    unlockedBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'rgba(52, 199, 89, 0.2)',
        borderRadius: 12,
    },
    unlockedText: {
        color: '#34C759',
        fontSize: 12,
        fontWeight: 'bold',
    },
    progressContainer: {
        marginBottom: 16,
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: Typography.sizes.sm,
    },
    actionContainer: {
        marginTop: 8,
    },
    empty: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: Typography.sizes.md,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: Typography.sizes.sm,
        textAlign: 'center',
    },
});
