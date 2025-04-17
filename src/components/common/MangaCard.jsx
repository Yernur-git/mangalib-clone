import React from 'react';
import { Link } from 'react-router-dom';

const MangaCard = ({ manga }) => {
    return (
        <Link to={`/manga/${manga.id}`} className="manga-card-link">
            <div className="manga-card">
                <img src={manga.coverImage} alt={manga.title} className="card-image" />
                <h3 className="card-title">{manga.title}</h3>
                <p className="card-genres">
                    {manga.genres && manga.genres.length > 0
                        ? manga.genres.join(', ')
                        : 'No genres available'}
                </p>
            </div>
        </Link>
    );
};

export default MangaCard;
