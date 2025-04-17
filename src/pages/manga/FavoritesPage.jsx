import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites } from '../../features/favorites/favoritesSlice';
import MangaCard from '../../components/common/MangaCard';
import '../../styles/cards.css';

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.favorites);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(fetchFavorites(user.id));
        }
    }, [user, dispatch]);

    return (
        <div className="container">
            <h2 className="manage-title">Your Favorites</h2>
            {items.length === 0 ? (
                <p style={{ color: '#aaa', textAlign: 'center' }}>No favorites yet. Add some manga to your favorites!</p>
            ) : (
                <div className="manga-grid">
                    {items.map(fav => (
                        <MangaCard
                            key={fav.mangaId}
                            manga={{
                                id: fav.mangaId,
                                title: fav.mangaTitle,
                                coverImage: fav.mangaCover,
                                genres: typeof fav.genres === 'string' ? fav.genres.split(', ') : (fav.genres || [])
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
