import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";

// Importăm componentele
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import SaliFitness from "./SaliFitness";
import Abonamente from "./Abonamente";
import AbonamenteSali from "./AbonamenteSali";
import Angajati from "./Angajati";
import AngajatiSali from "./AngajatiSali";
import Clase from "./Clase";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import PlataAbonament from "./PlataAbonament";

// Componentă pentru Logout
const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();  // Șterge datele de autentificare
        navigate('/login');    // Redirecționează către pagina de login
    };

    return (
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
    );
};

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav>
                        <ul>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/sali-fitness">Săli Fitness</Link></li>
                            <li><Link to="/abonamente">Abonamente</Link></li>
                            <li><Link to="/abonamente-sali">Abonamente Săli</Link></li>
                            <li><Link to="/angajati">Angajați</Link></li>
                            <li><Link to="/angajati-sali">Angajați Săli</Link></li>
                            <li><Link to="/clase">Clase</Link></li>
                            <li><Link to="/plata-abonament">Plata abonament</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><LogoutButton/></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Rute protejate */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/sali-fitness"
                            element={
                                <ProtectedRoute>
                                    <SaliFitness />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/abonamente"
                            element={
                                <ProtectedRoute>
                                    <Abonamente />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/abonamente-sali"
                            element={
                                <ProtectedRoute>
                                    <AbonamenteSali />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/angajati"
                            element={
                                <ProtectedRoute>
                                    <Angajati />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/angajati-sali"
                            element={
                                <ProtectedRoute>
                                    <AngajatiSali />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/clase"
                            element={
                                <ProtectedRoute>
                                    <Clase />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/plata-abonament"
                            element={
                                <ProtectedRoute>
                                    <PlataAbonament />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
