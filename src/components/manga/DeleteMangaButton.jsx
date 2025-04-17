import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteManga } from '../features/manga/mangaSlice';
import '../styles/forms.css';

const DeleteMangaButton = ({ id, onDelete, className }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    if (user?.role !== 'admin') return null;

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/manga/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete manga');
            }

            dispatch(deleteManga({ id }));
            onDelete(id);
        } catch (err) {
            console.error('Failed to delete manga:', err);
        }
    };

    return (
        <button onClick={handleDelete} className={className}>Delete</button>
    );
};

export default DeleteMangaButton;