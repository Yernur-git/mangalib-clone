import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/admin.css';

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const updateUserRole = (userId, newRole) => {
        fetch(`http://localhost:3001/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: newRole })
        })
            .then(() => {
                setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            });
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            fetch(`http://localhost:3001/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

                .then(() => {
                    setUsers(users.filter(u => u.id !== userId));
                });
        }
    };

    return (
        <div className="admin-container dark-theme">
            <h2 className="admin-title">Manage Users</h2>
            <div className="table-responsive">
                <table className="admin-table">
                    {/* Заголовки */}
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    {/* Тело таблицы */}
                    <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td data-label="Username">{u.username || 'N/A'}</td>
                            <td data-label="Email">{u.email}</td>
                            <td data-label="Role">
                                {user?.id !== u.id ? (
                                    <select className="role-select dark-select">
                                        {/* options */}
                                    </select>
                                ) : (
                                    <span className="current-role">{u.role}</span>
                                )}
                            </td>
                            <td data-label="Actions">
                                {user?.id !== u.id && (
                                    <button className="delete-btn dark-btn">
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsersPage;