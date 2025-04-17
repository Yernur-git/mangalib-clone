import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setComments: (state, action) => {
            state.items = action.payload;
        },
        addCommentSuccess: (state, action) => {
            state.items.push(action.payload);
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const fetchComments = (mangaId) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:3001/comments?mangaId=${mangaId}`);
        const data = await response.json();
        dispatch(setComments(data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const addComment = (commentData) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:3001/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData)
        });
        const data = await response.json();
        dispatch(addCommentSuccess(data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const { setComments, addCommentSuccess, setError } = commentsSlice.actions;
export default commentsSlice.reducer;