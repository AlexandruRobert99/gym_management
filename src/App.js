import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import SaliFitness from "./SaliFitness";
import Abonamente from "./Abonamente";
import PlataAbonament from "./PlataAbonament";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import PlatiAdmin from "./PlatiAdmin";
import Angajati from "./Angajati";
import AbonamenteSali from "./AbonamenteSali";
import Clase from "./Clase";
import AngajatiSali from "./AngajatiSali";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rute pentru Client */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
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

                {/* Rute pentru Manager */}
                <Route
                    path="/sali-fitness"
                    element={
                        <AdminRoute>
                            <SaliFitness />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/angajati"
                    element={
                        <AdminRoute>
                            <Angajati/>
                        </AdminRoute>
                    }
                />
                <Route
                    path="/abonamente"
                    element={
                        <AdminRoute>
                            <Abonamente/>
                        </AdminRoute>
                    }
                />
                <Route
                    path="/abonamente-sali"
                    element={
                        <AdminRoute>
                            <AbonamenteSali/>
                        </AdminRoute>
                    }
                />
                <Route
                    path="/plati"
                    element={
                        <AdminRoute>
                            <PlatiAdmin/>
                        </AdminRoute>
                    }
                />
                <Route
                    path="/clase"
                    element={
                        <AdminRoute>
                            <Clase/>
                        </AdminRoute>
                    }
                />
                <Route
                    path="/angajati-sali"
                    element={
                        <AdminRoute>
                            <AngajatiSali/>
                        </AdminRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
