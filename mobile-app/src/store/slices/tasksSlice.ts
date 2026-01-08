import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    _id: string;
    title: string;
    description: string;
    deadline: string;
    priority: 'high' | 'medium' | 'low';
    status: 'pending' | 'completed';
    microTasks: any[];
    tags: string[];
}

interface TasksState {
    tasks: Task[];
    loading: boolean;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(t => t._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(t => t._id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setTasks, addTask, updateTask, removeTask, setLoading } = tasksSlice.actions;
export default tasksSlice.reducer;
