import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import DashboardClase from "./DashboardClase";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const info = {
            id_client: localStorage.getItem('id_client'),
            nume: localStorage.getItem('nume'),
            prenume: localStorage.getItem('prenume'),
            email: localStorage.getItem('email'),
            telefon: localStorage.getItem('telefon'),
            adresa: localStorage.getItem('adresa'),
        };
        setUserInfo(info);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div>
            {/* Buton Logout în colțul din dreapta sus */}
            <button
                className="dashboard-logout-btn"
                onClick={handleLogout}>
                Logout
            </button>

            {/* Titlul Dashboard */}
            <h1 className="dashboard-title">Dashboard</h1>

            {/* Layout principal: informații + cod QR */}
            <div className="dashboard-layout">
                {/* Secțiunea pentru informații */}
                <div className="dashboard-info-container">
                    <h2>Informații Utilizator</h2>
                    <p className="dashboard-info">
                        <span>Nume:</span> {userInfo.nume || 'N/A'}
                    </p>
                    <p className="dashboard-info">
                        <span>Prenume:</span> {userInfo.prenume || 'N/A'}
                    </p>
                    <p className="dashboard-info">
                        <span>Email:</span> {userInfo.email || 'N/A'}
                    </p>
                    <p className="dashboard-info">
                        <span>Telefon:</span> {userInfo.telefon || 'N/A'}
                    </p>
                </div>

                {/* Secțiunea pentru codul QR */}
                <div className="dashboard-qr-container">
                    {userInfo.id_client && (
                        <div>
                            <h2>Cod QR pentru intrare</h2>
                            <QRCodeCanvas
                                value={userInfo.id_client}
                                size={200}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                            />
                        </div>
                    )}
                </div>

                <div className="dashboard-clase-container">
                    <DashboardClase />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
