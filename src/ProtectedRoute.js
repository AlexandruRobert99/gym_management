import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    if (!token || rol !== 'client') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
