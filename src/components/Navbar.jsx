import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
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

                            {/* Admin/Moderator Links */}
                            {['admin', 'moderator'].includes(user?.role) && (
                                <>
                                    <Link to="/manage-requests" className="navbar-link">Requests</Link>
                                    <Link to="/manage-mangas" className="navbar-link">Mangas</Link>
                                </>
                            )}

                            {/* Content Manager Links */}
                            {['admin', 'moderator', 'contentManager'].includes(user?.role) && (
                                <Link to="/content-management" className="navbar-link">Content</Link>
                            )}

                            {/* Editor Links */}
                            {['admin', 'editor'].includes(user?.role) && (
                                <Link to="/edit-chapters" className="navbar-link">Chapters</Link>
                            )}

                            {/* Admin Links */}
                            {user?.role === 'admin' && (
                                <Link to="/manage-users" className="navbar-link">Users</Link>
                            )}

                            <Link to="/profile" className="navbar-link">Profile</Link>
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