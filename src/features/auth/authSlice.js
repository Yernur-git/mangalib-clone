import { createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        role: null,
        isAuthenticated: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.role = action.payload.user.role;
            state.isAuthenticated = true;
        },
        logout: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        registerSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        loadUserFromStorage: (state) => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                state.user = JSON.parse(storedUser);
                state.isAuthenticated = true;
            }
        }
    }
})

export const { loginSuccess, logout, registerSuccess, loadUserFromStorage} = authSlice.actions;
export default authSlice.reducer;