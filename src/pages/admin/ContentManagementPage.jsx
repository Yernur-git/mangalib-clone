import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/content-management.css';

const ContentManagementPage = () => {
    const [mangas, setMangas] = useState([]);
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        // Load all mangas
        fetch('http://localhost:3001/manga')
            .then(res => res.json())
            .then(data => setMangas(data));

        // Load available genres
        fetch('http://localhost:3001/genres')
            .then(res => res.json())
            .then(data => setGenres(data));
    }, []);

    const handleAddGenre = async () => {
        if (!newGenre.trim()) return;

        try {
            const response = await fetch('http://localhost:3001/genres', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newGenre.trim() })
            });
            const data = await response.json();
            setGenres([...genres, data]);
            setNewGenre('');
        } catch (error) {
            console.error('Error adding genre:', error);
        }
    };

    const updateMangaCover = async (mangaId, file) => {
        const formData = new FormData();
        formData.append('coverImage', file);

        try {
            await fetch(`http://localhost:3001/manga/${mangaId}`, {
                method: 'PATCH',
                body: formData
            });
            // Refresh manga list
            const response = await fetch('http://localhost:3001/manga');
            const data = await response.json();
            setMangas(data);
        } catch (error) {
            console.error('Error updating cover:', error);
        }
    };

    return (
        <div className="admin-container">
            <h2>Content Management</h2>

            <div className="section">
                <h3>Manage Genres</h3>
                <div className="genre-management">
                    <input
                        type="text"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                        placeholder="New genre name"
                    />
                    <button onClick={handleAddGenre} className="add-button">
                        Add Genre
                    </button>

                    <div className="genres-list">
                        {genres.map(genre => (
                            <div key={genre.id} className="genre-tag">
                                {genre.name}
                                <button className="small-delete-btn">×</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="section">
                <h3>Manage Manga Covers</h3>
                <div className="manga-covers-grid">
                    {mangas.map(manga => (
                        <div key={manga.id} className="cover-item">
                            <img src={manga.coverImage} alt={manga.title} className="cover-preview" />
                            <p>{manga.title}</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => updateMangaCover(manga.id, e.target.files[0])}
                                id={`cover-upload-${manga.id}`}
                                className="file-input"
                            />
                            <label htmlFor={`cover-upload-${manga.id}`} className="upload-label">
                                Change Cover
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentManagementPage;