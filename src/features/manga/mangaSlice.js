import { createSlice} from '@reduxjs/toolkit';

const mangaSlice = createSlice({
    name: "manga",
    initialState: {
        mangas: [],
        selectedManga: null,
        status: 'idle',
        error: null,

    },
    reducers: {
        setMangas: (state, action) => {
            state.mangas = action.payload;
        },
        addManga: (state, action) => {
            state.mangas.push(action.payload);
        },
        updateManga: (state, action) => {
            const index = state.mangas.findIndex(m => m.id === action.payload.id);
            if (index !== -1) {
                state.mangas[index] = action.payload;
            }
        },
        deleteManga: (state, action) => {
            state.mangas = state.mangas.filter(m => m.id !== action.payload.id);
        },
        selectManga: (state, action) => {
            state.selectedManga = action.payload;
        }
    }
});

export const {
    setMangas,
    addManga,
    updateManga,
    deleteManga,
    selectManga,
} = mangaSlice.actions;

export default mangaSlice.reducer;





