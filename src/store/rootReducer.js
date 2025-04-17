import {combineReducers} from "redux";
import authReducer from '../features/auth/authSlice'
import mangaReducer from '../features/manga/mangaSlice'
import requestsReducer from '../features/requests/requestSlice'
import favoritesReducer from '../features/favorites/favoritesSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const rootReducer = combineReducers({
    auth: authReducer,
    manga: mangaReducer,
    requests: requestsReducer,
    favorites: favoritesReducer,
    comments: commentsReducer
})