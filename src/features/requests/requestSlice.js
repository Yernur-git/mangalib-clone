import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
    name: "requests",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        setRequests: (state, action) => {
            state.items = action.payload;
        },
        addRequest: (state, action) => {
            state.items.push(action.payload);
        },
        updateRequestStatus: (state, action) => {
            const { id, status } = action.payload;
            const request = state.items.find(r => r.id === id);
            if (request) {
                request.status = status;
            }
        },
        deleteRequest: (state, action) => {
            state.items = state.items.filter(r => r.id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

// Асинхронные операции
export const fetchRequests = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await fetch('http://localhost:3001/requests');
        const data = await response.json();
        dispatch(setRequests(data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const approveRequest = (requestId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await fetch(`http://localhost:3001/requests/${requestId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'approved' })
        });
        dispatch(updateRequestStatus({ id: requestId, status: 'approved' }));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const rejectRequest = (requestId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await fetch(`http://localhost:3001/requests/${requestId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'rejected' })
        });
        dispatch(updateRequestStatus({ id: requestId, status: 'rejected' }));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const {
    setRequests,
    addRequest,
    updateRequestStatus,
    deleteRequest,
    setLoading,
    setError
} = requestSlice.actions;

export default requestSlice.reducer;