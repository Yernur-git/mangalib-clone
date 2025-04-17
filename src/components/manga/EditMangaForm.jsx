import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateManga } from '../features/manga/mangaSlice';
import '../styles/forms.css';

const EditMangaForm = ({ onClose, onEdit }) => {
    const dispatch = useDispatch();
    const selectedManga = useSelector((state) => state.manga.selectedManga);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        author: '',
        genres: '',
        description: '',
        coverImage: '',
        uploaderId: ''
    });

    useEffect(() => {
        if (selectedManga) {
            setFormData({
                ...selectedManga,
                genres: selectedManga.genres.join(', ')
            });
        }
    }, [selectedManga]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedManga = {
            ...formData,
            genres: formData.genres.split(',').map(genre => genre.trim())
        };

        try {
            const res = await fetch(`http://localhost:3001/manga/${formData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedManga),
            });

            const data = await res.json();
            dispatch(updateManga(data));
            onEdit(data);
            onClose();
        } catch (err) {
            console.error('Failed to update manga:', err);
        }
    };

    if (!selectedManga) return null;

    return (
        <form onSubmit={handleSubmit} className="formContainer space-y-3">
            <div className="formGroup">
                <label className="formLabel">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="formInput" required />
            </div>
            <div className="formGroup">
                <label className="formLabel">Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} className="formInput" required />
            </div>
            <div className="formGroup">
                <label className="formLabel">Genres (comma separated)</label>
                <input type="text" name="genres" value={formData.genres} onChange={handleChange} className="formInput" required />
            </div>
            <div className="formGroup">
                <label className="formLabel">Cover Image URL</label>
                <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} className="formInput" required />
            </div>
            <div className="formGroup">
                <label className="formLabel">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="formInput" rows="3" required />
            </div>
            <div className="formActions">
                <button type="submit" className="submitButton">Save Changes</button>
                <button type="button" onClick={onClose} className="cancelButton">Cancel</button>
            </div>
        </form>
    );
};

export default EditMangaForm;