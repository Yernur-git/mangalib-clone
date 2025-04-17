import React from 'react';

const MangaCard = ({ manga }) => {
    return (
        <div className="manga-card">
            <img src={manga.coverImage} alt={manga.title} className="card-image" />
            <h3 className="card-title">{manga.title}</h3>
            <p className="card-author">{manga.author}</p>
            <p className="card-genres">{manga.genres.join(', ')}</p>
        </div>
    );
};

export default MangaCard;