import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Verifică dacă există token

    if (!token) {
        // Dacă utilizatorul nu este logat, redirecționează la login
        return <Navigate to="/login" replace />;
    }

    // Dacă utilizatorul este logat, permite accesul la componenta protejată
    return children;
};

export default ProtectedRoute;
