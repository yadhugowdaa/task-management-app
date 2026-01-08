import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, useColorScheme, TouchableOpacity, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setTasks, removeTask } from '../../store/slices/tasksSlice';
import { taskService } from '../../services/api';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

export const TasksScreen = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const dispatch = useDispatch();

    const { tasks } = useSelector((state: RootState) => state.tasks);
    const { user } = useSelector((state: RootState) => state.auth);

    const [refreshing, setRefreshing] = useState(false);

    const loadTasks = async () => {
        if (!user) return;

        try {
            const data = await taskService.getTasks(user._id);
            dispatch(setTasks(data));
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    const handleComplete = async (taskId: string) => {
        if (!user) return;

        try {
            await taskService.completeTask(user._id, taskId);
            await loadTasks();
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleDelete = async (taskId: string) => {
        if (!user) return;

        try {
            await taskService.deleteTask(user._id, taskId);
            dispatch(removeTask(taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadTasks();
        setRefreshing(false);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return '#FF3B30';
            case 'medium':
                return '#FF9500';
            case 'low':
                return '#34C759';
            default:
                return Colors.accent.primary;
        }
    };

    const renderTask = ({ item }: any) => (
        <View style={styles.taskContainer}>
            <GlassCard priority={item.priority}>
                <View style={styles.taskContent}>
                    <View style={styles.taskHeader}>
                        <Text style={[styles.taskTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                            {item.title}
                        </Text>
                        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                            <Text style={styles.priorityText}>{item.priority.toUpperCase()}</Text>
                        </View>
                    </View>

                    {item.description && (
                        <Text style={[styles.taskDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                            {item.description}
                        </Text>
                    )}

                    <View style={styles.taskFooter}>
                        <Text style={[styles.deadline, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                            Due: {new Date(item.deadline).toLocaleDateString()}
                        </Text>

                        <View style={styles.actions}>
                            {item.status === 'pending' && (
                                <TouchableOpacity onPress={() => handleComplete(item._id)}>
                                    <Text style={[styles.actionText, { color: Colors.success }]}>Complete</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity onPress={() => handleDelete(item._id)}>
                                <Text style={[styles.actionText, { color: Colors.error.primary }]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {item.status === 'completed' && (
                        <View style={styles.completedBadge}>
                            <Text style={styles.completedText}>✓ COMPLETED</Text>
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
                    My Tasks
                </Text>
                <Text style={[styles.subtitle, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                    {tasks.filter(t => t.status === 'pending').length} pending · {tasks.filter(t => t.status === 'completed').length} completed
                </Text>
            </View>

            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={[styles.emptyText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                            No tasks yet. Pull to refresh!
                        </Text>
                    </View>
                }
            />

            <View style={styles.addButton}>
                <GlassButton title="+ Add Task" onPress={() => { }} variant="primary" />
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
        marginBottom: 4,
    },
    subtitle: {
        fontSize: Typography.sizes.md,
    },
    list: {
        padding: 16,
        paddingTop: 0,
    },
    taskContainer: {
        marginBottom: 16,
    },
    taskContent: {
        padding: 16,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    taskTitle: {
        fontSize: Typography.sizes.lg,
        fontWeight: '600',
        flex: 1,
        marginRight: 8,
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    priorityText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    taskDescription: {
        fontSize: Typography.sizes.sm,
        marginBottom: 12,
    },
    taskFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deadline: {
        fontSize: Typography.sizes.sm,
    },
    actions: {
        flexDirection: 'row',
        gap: 16,
    },
    actionText: {
        fontSize: Typography.sizes.sm,
        fontWeight: '600',
    },
    completedBadge: {
        marginTop: 12,
        padding: 8,
        backgroundColor: 'rgba(52, 199, 89, 0.2)',
        borderRadius: 8,
        alignItems: 'center',
    },
    completedText: {
        color: '#34C759',
        fontSize: 12,
        fontWeight: 'bold',
    },
    empty: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: Typography.sizes.md,
    },
    addButton: {
        padding: 16,
        paddingBottom: 32,
    },
});
