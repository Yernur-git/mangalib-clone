import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
        status: 'idle'
    },
    reducers: {
        setFavorites: (state, action) => {
            state.items = action.payload;
        },
        addFavoriteSuccess: (state, action) => {
            // Prevent duplicates
            if (!state.items.some(item => item.mangaId === action.payload.mangaId)) {
                state.items.push(action.payload);
            }
        },
        removeFavoriteSuccess: (state, action) => {
            state.items = state.items.filter(item => item.mangaId !== action.payload.mangaId);
        }
    }
});

// Async actions
export const fetchFavorites = (userId) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:3001/favorites?userId=${userId}`);
        const data = await response.json();
        dispatch(setFavorites(data));
    } catch (error) {
        console.error('Failed to fetch favorites:', error);
    }
};

export const addFavorite = (favoriteData) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:3001/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(favoriteData)
        });
        const data = await response.json();
        dispatch(addFavoriteSuccess(data));
    } catch (error) {
        console.error('Failed to add favorite:', error);
    }
};

export const removeFavorite = ({ mangaId, userId }) => async (dispatch) => {
    try {
        // Find favorite in DB
        const response = await fetch(`http://localhost:3001/favorites?mangaId=${mangaId}&userId=${userId}`);
        const [favorite] = await response.json();

        if (favorite) {
            await fetch(`http://localhost:3001/favorites/${favorite.id}`, {
                method: 'DELETE'
            });
            dispatch(removeFavoriteSuccess({ mangaId }));
        }
    } catch (error) {
        console.error('Failed to remove favorite:', error);
    }
};

export const { setFavorites, addFavoriteSuccess, removeFavoriteSuccess } = favoritesSlice.actions;
export default favoritesSlice.reducer;