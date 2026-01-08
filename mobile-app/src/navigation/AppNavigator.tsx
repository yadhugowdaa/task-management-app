import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Colors } from '../theme/colors';

// Auth Screens
import { LoginScreen } from '../screens/auth/LoginScreen';

// Main Screens
import { TasksScreen } from '../screens/tasks/TasksScreen';
import { AnalyticsScreen } from '../screens/analytics/AnalyticsScreen';
import { RewardsScreen } from '../screens/rewards/RewardsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
                    borderTopColor: isDark ? Colors.dark.border : Colors.light.border,
                },
                tabBarActiveTintColor: Colors.accent.primary,
                tabBarInactiveTintColor: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
            }}>
            <Tab.Screen name="Tasks" component={TasksScreen} />
            <Tab.Screen name="Analytics" component={AnalyticsScreen} />
            <Tab.Screen name="Rewards" component={RewardsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export function AppNavigator() {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <Stack.Screen name="Login" component={LoginScreen} />
                ) : (
                    <Stack.Screen name="Main" component={MainTabs} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
