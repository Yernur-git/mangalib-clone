import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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

    return (
        <div className="container">
            <h2>Manage Users</h2>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>
                            {user?.id !== u.id ? (
                                <select value={u.role} onChange={(e) => updateUserRole(u.id, e.target.value)}>
                                    <option value="reader">Reader</option>
                                    <option value="editor">Editor</option>
                                    <option value="contentManager">Content Manager</option>
                                    <option value="moderator">Moderator</option>
                                    <option value="admin">Admin</option>
                                </select>
                            ) : (
                                u.role
                            )}
                        </td>
                        <td>
                            {user?.id !== u.id && (
                                <button>Delete</button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsersPage;