import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Reward {
    _id: string;
    appName: string;
    isLocked: boolean;
    remainingMinutes: number;
}

interface RewardsState {
    rewards: Reward[];
}

const initialState: RewardsState = {
    rewards: [],
};

const rewardsSlice = createSlice({
    name: 'rewards',
    initialState,
    reducers: {
        setRewards: (state, action: PayloadAction<Reward[]>) => {
            state.rewards = action.payload;
        },
        addReward: (state, action: PayloadAction<Reward>) => {
            state.rewards.push(action.payload);
        },
    },
});

export const { setRewards, addReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;
