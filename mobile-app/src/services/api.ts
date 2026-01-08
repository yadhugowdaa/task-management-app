import api from './api';

export const authService = {
    register: async (name: string, email: string, password: string) => {
        const response = await api.post('http://localhost:3001/auth/register', {
            name,
            email,
            password,
        });
        return response.data;
    },

    login: async (email: string, password: string) => {
        const response = await api.post('http://localhost:3001/auth/login', {
            email,
            password,
        });
        return response.data;
    },
};

export const taskService = {
    getTasks: async (userId: string) => {
        const response = await api.get('http://localhost:3002/tasks', {
            headers: { 'user-id': userId },
        });
        return response.data;
    },

    createTask: async (userId: string, taskData: any) => {
        const response = await api.post('http://localhost:3002/tasks', taskData, {
            headers: { 'user-id': userId },
        });
        return response.data;
    },

    completeTask: async (userId: string, taskId: string) => {
        const response = await api.post(
            `http://localhost:3002/tasks/${taskId}/complete`,
            {},
            { headers: { 'user-id': userId } }
        );
        return response.data;
    },

    deleteTask: async (userId: string, taskId: string) => {
        const response = await api.delete(`http://localhost:3002/tasks/${taskId}`, {
            headers: { 'user-id': userId },
        });
        return response.data;
    },
};

export const analyticsService = {
    getMetrics: async (userId: string, period: string = 'week') => {
        const response = await api.get(
            `http://localhost:3004/analytics/metrics?period=${period}`,
            { headers: { 'user-id': userId } }
        );
        return response.data;
    },

    getCompletionTrend: async (userId: string, days: number = 7) => {
        const response = await api.get(
            `http://localhost:3004/analytics/charts/completion-trend?days=${days}`,
            { headers: { 'user-id': userId } }
        );
        return response.data;
    },
};

export const rewardService = {
    getRewards: async (userId: string) => {
        const response = await api.get('http://localhost:3006/rewards', {
            headers: { 'user-id': userId },
        });
        return response.data;
    },

    unlockApp: async (userId: string, rewardId: string) => {
        const response = await api.post(
            `http://localhost:3006/rewards/${rewardId}/unlock`,
            {},
            { headers: { 'user-id': userId } }
        );
        return response.data;
    },
};
