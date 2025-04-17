import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AddMangaForm from '../../components/manga/AddMangaForm';
import MangaListAdmin from '../../components/MangaListAdmin';
import '../../styles/admin.css';

const ManageMangasPage = () => {
    const dispatch = useDispatch();
    const [mangas, setMangas] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchMangas = async () => {
            try {
                const res = await fetch('http://localhost:3001/manga');
                const data = await res.json();
                setMangas(data);
            } catch (err) {
                console.error('Failed to fetch mangas:', err);
            }
        };

        fetchMangas();
    }, [dispatch]);

    const handleAdd = (newManga) => {
        setMangas((prev) => [...prev, newManga]);
    };

    const handleDelete = (id) => {
        setMangas((prev) => prev.filter((manga) => manga.id !== id));
    };

    const handleEdit = (updatedManga) => {
        setMangas((prev) =>
            prev.map((m) => (m.id === updatedManga.id ? updatedManga : m))
        );
    };

    return (
        <div className="manage-mangas-container">
            <h2 className="manage-title">Manage Mangas</h2>
            {user?.role === 'admin' && <AddMangaForm onAdd={handleAdd} />}
            <MangaListAdmin
                mangas={mangas}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
};

export default ManageMangasPage;