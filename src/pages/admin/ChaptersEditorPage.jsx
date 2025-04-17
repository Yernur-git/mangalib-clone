import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../styles/chapters-editor.css';

const ChaptersEditorPage = () => {
    const { mangaId } = useParams();
    const [chapters, setChapters] = useState([]);
    const [newChapter, setNewChapter] = useState({ number: '', file: null });
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://localhost:3001/chapters?mangaId=${mangaId}`)
            .then(res => res.json())
            .then(data => setChapters(data));
    }, [mangaId]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!newChapter.number || !newChapter.file) return;

        const formData = new FormData();
        formData.append('chapterNumber', newChapter.number);
        formData.append('file', newChapter.file);
        formData.append('uploaderId', user.id);
        formData.append('mangaId', mangaId);

        try {
            const response = await fetch('http://localhost:3001/chapters', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setChapters([...chapters, data]);
            setNewChapter({ number: '', file: null });
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <div className="admin-container">
            <h2>Edit Chapters</h2>

            <div className="upload-section">
                <h3>Upload New Chapter</h3>
                <form onSubmit={handleUpload}>
                    <div className="form-group">
                        <label>Chapter Number:</label>
                        <input
                            type="number"
                            value={newChapter.number}
                            onChange={(e) => setNewChapter({...newChapter, number: e.target.value})}
                            min="1"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Chapter File (ZIP/PDF):</label>
                        <input
                            type="file"
                            accept=".zip,.pdf"
                            onChange={(e) => setNewChapter({...newChapter, file: e.target.files[0]})}
                            required
                        />
                    </div>

                    <button type="submit" className="upload-button">
                        Upload Chapter
                    </button>
                </form>
            </div>

            <div className="chapters-list">
                <h3>Existing Chapters</h3>
                {chapters.length > 0 ? (
                    <table className="chapters-table">
                        <thead>
                        <tr>
                            <th>Chapter</th>
                            <th>Uploaded By</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {chapters.map(chapter => (
                            <tr key={chapter.id}>
                                <td>Chapter {chapter.number}</td>
                                <td>User #{chapter.uploaderId}</td>
                                <td>{new Date(chapter.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No chapters uploaded yet</p>
                )}
            </div>
        </div>
    );
};

export default ChaptersEditorPage;