import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tag {
    _id: string;
    name: string;
    color: string;
}

interface TagsState {
    tags: Tag[];
}

const initialState: TagsState = {
    tags: [],
};

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<Tag[]>) => {
            state.tags = action.payload;
        },
        addTag: (state, action: PayloadAction<Tag>) => {
            state.tags.push(action.payload);
        },
    },
});

export const { setTags, addTag } = tagsSlice.actions;
export default tagsSlice.reducer;
