import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import '../styles/Navbar.css';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allMangas, setAllMangas] = useState([]);
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMangas = async () => {
            try {
                const response = await fetch('http://localhost:3001/manga');
                const data = await response.json();
                setAllMangas(data);
            } catch (error) {
                console.error('Error fetching mangas:', error);
            }
        };

        fetchMangas();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query) {
            const filteredMangas = allMangas.filter((manga) =>
                manga.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredMangas);
        } else {
            setSearchResults([]);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout());
        navigate('/login');
    };

    const isAdmin = user?.role === 'admin';
    const isModerator = user?.role === 'moderator';
    const isContentManager = user?.role === 'contentManager';
    const isEditor = user?.role === 'editor';

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" className="navbar-link">MangaLib</Link>
                </div>

                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder="Search Manga..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="navbar-search-input"
                    />
                    {searchQuery && (
                        <ul className="navbar-search-results">
                            {searchResults.length > 0 ? (
                                searchResults.map((manga) => (
                                    <li key={manga.id}>
                                        <Link to={`/manga/${manga.id}`} className="navbar-search-link">
                                            {manga.title}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="navbar-search-no-results">No results found</li>
                            )}
                        </ul>
                    )}
                </div>

                <div className="navbar-links">
                    {isAuthenticated ? (
                        <>
                            <Link to="/favorites" className="navbar-link">Favorites</Link>

                            {isAdmin && (
                                <>
                                    <Link to="/manage-users" className="navbar-link">Manage Users</Link>
                                    <Link to="/manage-requests" className="navbar-link">Requests</Link>
                                </>
                            )}

                            {(isAdmin || isModerator) && (
                                <Link to="/manage-mangas" className="navbar-link">Manage Mangas</Link>
                            )}

                            {isContentManager && (
                                <Link to="/content-management" className="navbar-link">Content</Link>
                            )}

                            {isEditor && (
                                <Link to="/edit-chapters" className="navbar-link">Edit Chapters</Link>
                            )}

                            <Link to="/profile" className="navbar-link">Profile</Link>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-link">Login</Link>
                            <Link to="/register" className="navbar-link">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
