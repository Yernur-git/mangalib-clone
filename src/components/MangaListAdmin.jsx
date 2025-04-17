import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { selectManga } from '../features/manga/mangaSlice';
import EditMangaForm from "./manga/EditMangaForm";
import DeleteMangaButton from "./manga/DeleteMangaButton";
import '../styles/admin.css';

const MangaListAdmin = ({ mangas, onDelete, onEdit }) => {
    const dispatch = useDispatch();
    const [editingId, setEditingId] = useState(null);
    const { user } = useSelector((state) => state.auth);

    const handleEditClick = (manga) => {
        dispatch(selectManga(manga));
        setEditingId(manga.id);
    };

    return (
        <div className="manga-admin-grid">
            {mangas.map((manga) => (
                <div key={manga.id} className="admin-manga-card">
                    {editingId === manga.id ? (
                        <EditMangaForm
                            onClose={() => setEditingId(null)}
                            onEdit={onEdit}
                        />
                    ) : (
                        <>
                            <img
                                src={manga.coverImage}
                                alt={manga.title}
                                className="admin-manga-cover"
                            />
                            <div className="admin-manga-content">
                                <h3 className="admin-manga-title">{manga.title}</h3>
                                <p className="admin-manga-author">{manga.author}</p>
                                <div className="admin-manga-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEditClick(manga)}
                                    >
                                        Edit
                                    </button>

                                    {user?.role === 'admin' && (
                                        <DeleteMangaButton
                                            className="delete-btn"
                                            id={manga.id}
                                            onDelete={onDelete}
                                        />
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MangaListAdmin;