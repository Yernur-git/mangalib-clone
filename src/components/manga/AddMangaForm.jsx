import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addManga } from '../../features/manga/mangaSlice';
import '../../styles/forms.css';

const AddMangaForm = ({ onAdd }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genres: '',
        description: '',
        coverImage: '',
        uploaderId: user?.id || null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newManga = { ...formData, genres: formData.genres.split(',').map(g => g.trim()) };

        try {
            const res = await fetch('http://localhost:3001/manga', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newManga),
            });
            const data = await res.json();
            dispatch(addManga(data));
            onAdd(data);
            setFormData({ title: '', author: '', genres: '', description: '', coverImage: '', uploaderId: 3 });
        } catch (err) {
            console.error('Failed to add manga:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="formContainer mb-6 space-y-4">
            <h2 className="formTitle">Add New Manga</h2>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="formInput" required />
            <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="formInput" required />
            <input name="genres" placeholder="Genres (comma separated)" value={formData.genres} onChange={handleChange} className="formInput" required />
            <input name="coverImage" placeholder="Cover Image URL" value={formData.coverImage} onChange={handleChange} className="formInput" required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="formInput" required />
            <button type="submit" className="submitButton">Add Manga</button>
        </form>
    );
};

export default AddMangaForm;