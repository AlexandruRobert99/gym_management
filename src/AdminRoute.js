import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const functie = localStorage.getItem('functie'); // Extragerea rolului

    if (!functie || functie !== 'manager') {
        // Dacă nu este manager, redirecționează la login
        return <Navigate to="/login" replace />;
    }

    // Dacă este manager, permite accesul
    return children;
};

export default AdminRoute;
