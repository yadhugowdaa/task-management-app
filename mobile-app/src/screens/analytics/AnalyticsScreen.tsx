import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { analyticsService } from '../../services/api';
import { GlassCard } from '../../components/ui/GlassCard';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

export const AnalyticsScreen = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { user } = useSelector((state: RootState) => state.auth);

    const [metrics, setMetrics] = useState<any>(null);

    useEffect(() => {
        loadMetrics();
    }, []);

    const loadMetrics = async () => {
        if (!user) return;

        try {
            const data = await analyticsService.getMetrics(user._id, 'week');
            setMetrics(data);
        } catch (error) {
            console.error('Error loading metrics:', error);
        }
    };

    const MetricCard = ({ title, value, unit, color }: any) => (
        <View style={styles.metricContainer}>
            <GlassCard>
                <View style={styles.metricContent}>
                    <Text style={[styles.metricTitle, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                        {title}
                    </Text>
                    <Text style={[styles.metricValue, { color: color || (isDark ? Colors.dark.text : Colors.light.text) }]}>
                        {value}
                        {unit && <Text style={styles.metricUnit}> {unit}</Text>}
                    </Text>
                </View>
            </GlassCard>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                    Analytics
                </Text>
                <Text style={[styles.subtitle, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                    Your productivity metrics
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {metrics ? (
                    <>
                        <View style={styles.row}>
                            <MetricCard
                                title="Completion Rate"
                                value={metrics.completionRate}
                                unit="%"
                                color={metrics.completionRate >= 70 ? Colors.success : Colors.warning}
                            />
                            <MetricCard
                                title="Productivity"
                                value={metrics.productivity}
                                unit="/100"
                                color={Colors.accent.primary}
                            />
                        </View>

                        <View style={styles.row}>
                            <MetricCard
                                title="Focus Hours"
                                value={metrics.focusHours}
                                unit="hrs"
                                color={Colors.accent.secondary}
                            />
                            <MetricCard
                                title="Efficiency"
                                value={metrics.efficiency}
                                unit="%"
                                color={metrics.efficiency >= 80 ? Colors.success : Colors.warning}
                            />
                        </View>

                        <View style={styles.row}>
                            <MetricCard
                                title="Streak"
                                value={metrics.streakDays}
                                unit="days"
                                color="#FF9500"
                            />
                            <MetricCard
                                title="On-Time Rate"
                                value={metrics.onTimeRate}
                                unit="%"
                                color={metrics.onTimeRate >= 80 ? Colors.success : Colors.error.primary}
                            />
                        </View>

                        <View style={styles.fullWidthCard}>
                            <GlassCard>
                                <View style={styles.summaryContent}>
                                    <Text style={[styles.summaryTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                                        Weekly Summary
                                    </Text>
                                    <Text style={[styles.summaryText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                                        {metrics.completedTasks} of {metrics.totalTasks} tasks completed this week
                                    </Text>
                                    {metrics.procrastinationIndex > 3 && (
                                        <Text style={[styles.warningText, { color: Colors.error.primary }]}>
                                            ⚠️ High procrastination detected ({metrics.procrastinationIndex.toFixed(1)} days avg delay)
                                        </Text>
                                    )}
                                </View>
                            </GlassCard>
                        </View>
                    </>
                ) : (
                    <View style={styles.empty}>
                        <Text style={[styles.emptyText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                            Loading analytics...
                        </Text>
                    </View>
                )}
            </ScrollView>
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
    content: {
        padding: 16,
        paddingTop: 0,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    metricContainer: {
        flex: 1,
    },
    metricContent: {
        padding: 16,
    },
    metricTitle: {
        fontSize: Typography.sizes.sm,
        marginBottom: 8,
    },
    metricValue: {
        fontSize: Typography.sizes.xl,
        fontWeight: 'bold',
    },
    metricUnit: {
        fontSize: Typography.sizes.md,
        fontWeight: 'normal',
    },
    fullWidthCard: {
        marginBottom: 16,
    },
    summaryContent: {
        padding: 16,
    },
    summaryTitle: {
        fontSize: Typography.sizes.lg,
        fontWeight: '600',
        marginBottom: 8,
    },
    summaryText: {
        fontSize: Typography.sizes.md,
        marginBottom: 8,
    },
    warningText: {
        fontSize: Typography.sizes.sm,
        marginTop: 4,
    },
    empty: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: Typography.sizes.md,
    },
});
