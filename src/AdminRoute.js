import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    if (!token || rol !== 'manager') {
        return <Navigate to="/plati" replace />;
    }

    return children;
};

export default AdminRoute;
