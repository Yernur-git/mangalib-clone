import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavoriteSuccess, fetchFavorites } from "../../features/favorites/favoritesSlice";
import {addComment, fetchComments, setComments} from "../../features/comments/commentsSlice";
import CommentForm from '../../components/common/CommentForm';
import CommentList from '../../components/common/CommentList';
import '../../styles/manga-detail.css';

const MangaDetailPage = () => {
    const { id } = useParams();
    const [manga, setManga] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [activeTab, setActiveTab] = useState("about");
    const [isFavorite, setIsFavorite] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { items: favorites } = useSelector((state) => state.favorites);
    const { items: comments } = useSelector((state) => state.comments);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://localhost:3001/manga/${id}`)
            .then((res) => res.json())
            .then((data) => setManga(data));

        if (user) {
            dispatch(fetchFavorites(user.id));
        }

        dispatch(fetchComments(id));
    }, [id, user, dispatch]);

    useEffect(() => {
        if (user && manga) {
            const found = favorites.some(
                (fav) => fav.userId === user.id && fav.mangaId === manga.id
            );
            setIsFavorite(found);
        }
    }, [favorites, manga, user]);


    const handleFavoriteClick = async () => {
        if (!user || !manga) return;

        if (isFavorite) {
            const favoriteItem = favorites.find(
                (fav) => fav.userId === user.id && fav.mangaId === manga.id
            );
            if (favoriteItem) {
                await fetch(`http://localhost:3001/favorites/${favoriteItem.id}`, {
                    method: 'DELETE',
                });
                dispatch(fetchFavorites(user.id)); // обновим список
                setIsFavorite(false);
            }
        } else {
            const response = await fetch(`http://localhost:3001/favorites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mangaId: manga.id,
                    userId: user.id,
                    mangaTitle: manga.title,
                    mangaCover: manga.coverImage,
                    genres: manga.genres,
                }),
            });
            const data = await response.json();
            dispatch(fetchFavorites(user.id));
            setIsFavorite(true);
        }
    };

    const handleAddComment = () => {
        if (!commentText.trim() || !user) return;

        dispatch(addComment({
            mangaId: id,
            userId: user.id,
            username: user.username,
            text: commentText,
            date: new Date().toISOString()
        }));

        setCommentText("");
    };

    if (!manga) return <div className="manga-loading">Loading...</div>;

    return (
        <div className="manga-detail-container">
            <div className="manga-cover-section">
                <img
                    src={manga.coverImage}
                    alt={manga.title}
                    className="manga-detail-cover"
                    onError={(e) => {
                        e.target.src = '/placeholder-cover.jpg';
                    }}
                />

                {user && (
                    <button
                        onClick={handleFavoriteClick}
                        className={`favorite-button ${isFavorite ? 'active' : ''}`}
                    >
                        {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
                    </button>
                )}
            </div>

            <div className="manga-content-section">
                <div className="manga-title-section">
                    <h1 className="manga-detail-title">{manga.title}</h1>
                    <p className="manga-detail-subtitle">{manga.alternateTitle || "Translated by Team"}</p>
                </div>

                <div className="manga-tabs">
                    <button
                        className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveTab('about')}
                    >
                        About
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'chapters' ? 'active' : ''}`}
                        onClick={() => setActiveTab('chapters')}
                    >
                        Chapters
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'comments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('comments')}
                    >
                        Comments ({comments.length})
                    </button>
                </div>

                {activeTab === 'about' && (
                    <>
                        <div className="manga-description-box">
                            <p>{manga.description}</p>
                        </div>

                        <div className="manga-tags">
                            {manga.genres.concat(manga.tags || []).map((tag, index) => (
                                <span key={index} className="manga-tag">#{tag}</span>
                            ))}
                        </div>

                        <div className="manga-additional-info">
                            <div className="info-section">
                                <h3>Translators</h3>
                                <p>Team Name</p>
                            </div>

                            <div className="info-section">
                                <h3>Type</h3>
                                <p>Manga</p>
                                <h3>Published</h3>
                                <p>2023</p>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'chapters' && (
                    <div className="chapters-list">
                        <h3>Chapters will be here</h3>
                    </div>
                )}

                {activeTab === 'comments' && (
                    <div className="comments-section">
                        {user ? (
                            <div className="comment-form">
                                <textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Write your comment..."
                                />
                                <button onClick={handleAddComment}>Post Comment</button>
                            </div>
                        ) : (
                            <p>Please login to leave comments</p>
                        )}

                        <div className="comments-list">
                            {comments.length > 0 ? (
                                comments.map(comment => (
                                    <div key={comment.id} className="comment">
                                        <div className="comment-header">
                                            <strong>{comment.username}</strong>
                                            <span>{new Date(comment.date).toLocaleString()}</span>
                                        </div>
                                        <p className="comment-text">{comment.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MangaDetailPage;