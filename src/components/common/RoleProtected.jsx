import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RoleProtected = ({ children, allowedRoles }) => {
    const { user } = useSelector((state) => state.auth);

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RoleProtected;