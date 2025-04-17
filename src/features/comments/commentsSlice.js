import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        items: [],
        status: 'idle'
    },
    reducers: {
        addComment: (state, action) => {
            state.items.push(action.payload);
        },
        setComments: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const { addComment, setComments } = commentSlice.actions;
export default commentSlice.reducer;