import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'

const Navbar = () => {
    const navigate = useNavigate();
    const rol = localStorage.getItem('rol');  // Verificăm rolul
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                {isLoggedIn && rol === 'client' && (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/plata-abonament">Plata Abonament</Link></li>
                    </>
                )}

                {isLoggedIn && rol === 'manager' && (
                    <>
                        <li><Link to="/sali-fitness">Săli Fitness</Link></li>
                        <li><Link to="/abonamente">Abonamente</Link></li>
                        <li><Link to="/abonamente-sali">Abonamente Săli</Link></li>
                        <li><Link to="/angajati">Angajați</Link></li>
                        <li><Link to="/angajati-sali">Angajați Săli</Link></li>
                        <li><Link to="/clase">Clase</Link></li>
                        <li><Link to="/plati">Istoric Plăți</Link></li>
                    </>
                )}

                {!isLoggedIn && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}

                {isLoggedIn && (
                    <li>
                        <button
                            onClick={handleLogout}
                            style={{
                                backgroundColor: '#ff4d4d',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
