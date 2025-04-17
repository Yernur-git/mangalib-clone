import { createSlice} from '@reduxjs/toolkit';

const requestSlice = createSlice({
    name: "request",
    initialState: {
        requests: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setRequests: (state, action) =>  {
            state.requests = action.payload;
        },
        addRequest: (state, action) => {
            state.requests.push(action.payload);
        },
        approveRequest: (state, action) => {
            const req = state.requests.find(r => r.id === action.payload);
            if (req) {
                state.status = 'approved';
            }
        },
        rejectRequest: (state, action) => {
            const req = state.requests.find(r => r.id === action.payload);
            if (req) {
                state.status = 'rejected';
            }
        },
        deleteRequest: (state, action) => {
            state.requests = state.requests.filter(r => r.id !== action.payload);
        }
    }
});

export const {
    setRequests,
    addRequest,
    approveRequest,
    rejectRequest,
    deleteRequest,
} = requestSlice.actions;

export default requestSlice.reducer;