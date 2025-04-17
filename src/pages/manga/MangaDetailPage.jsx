import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/manga-detail.css';

const MangaDetailPage = () => {
    const { id } = useParams();
    const [manga, setManga] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/manga/${id}`)
            .then((res) => res.json())
            .then((data) => setManga(data));
    }, [id]);

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
            </div>

            <div className="manga-content-section">
                <div className="manga-title-section">
                    <h1 className="manga-detail-title">{manga.title}</h1>
                    <p className="manga-detail-subtitle">{manga.alternateTitle || "Translated by Team"}</p>
                </div>

                <div className="manga-meta-info">
                    <span className="meta-item">About Title</span>
                    <span className="meta-item">Chapters</span>
                    <span className="meta-item">Comments</span>
                    <span className="meta-item">Reviews</span>
                </div>

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
            </div>
        </div>
    );
};

export default MangaDetailPage;