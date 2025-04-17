import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/manga-detail.css';

const MangaListPage = () => {
    const [manga, setManga] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/manga")
            .then((res) => res.json())
            .then((data) => setManga(data));
    }, []);

    return (
        <div className="container p-4">
            <h2 className="text-xl font-bold mb-4">Manga List</h2>
            <div className="manga-grid">
                {manga.map((m) => (
                    <div key={m.id} className="manga-card">
                        <Link to={`/manga/${m.id}`} className="manga-link">
                            <div className="manga-cover-container">
                                <img
                                    src={m.coverImage}
                                    alt={`${m.title} cover`}
                                    className="manga-cover"
                                />
                            </div>

                            <div className="manga-content">
                                <h3 className="manga-title">{m.title}</h3>
                                <p className="manga-author">{m.author}</p>
                                <div className="manga-genres">
                                    {m.genres.slice(0, 2).map((genre, index) => (
                                        <span key={index} className="genre-tag">{genre}</span>
                                    ))}
                                    {m.genres.length > 2 && (
                                        <span className="genre-tag">+{m.genres.length - 2}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MangaListPage;