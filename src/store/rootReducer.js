import {combineReducers} from "redux";
import authReducer from '../features/auth/authSlice'
import mangaReducer from '../features/manga/mangaSlice'
import requestReducer from '../features/requests/requestSlice'
import favoritesReducer from '../features/favorites/favoritesSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const rootReducer = combineReducers({
    auth: authReducer,
    manga: mangaReducer,
    request: requestReducer,
    favorites: favoritesReducer,
    comments: commentsReducer
})