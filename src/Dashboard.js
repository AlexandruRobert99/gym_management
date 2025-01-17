import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import DashboardClase from "./DashboardClase";

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState({});
    const [abonamentActiv, setAbonamentActiv] = useState(null);

    // Preluăm informațiile utilizatorului și abonamentul activ
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

        if (info.id_client) {
            fetchAbonamentActiv(info.id_client);
        }
    }, []);

    // Preluăm abonamentul activ al utilizatorului
    const fetchAbonamentActiv = async (clientId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/plati/?id_client=${clientId}`);
            if (response.ok) {
                const data = await response.json();

                if (data.length > 0) {
                    setAbonamentActiv(data[0]);
                }
            }
        } catch (error) {
            console.error("Eroare la preluarea abonamentului activ:", error);
        }
    };

    return (
        <div>
            {/* Titlul Dashboard */}
            <h1 className="dashboard-title">Dashboard</h1>

            {/* Layout principal: informații + cod QR */}
            <div className="dashboard-layout">
                {/* Secțiunea pentru informații */}
                <div className="dashboard-info-container">
                    <h2>Informații Utilizator</h2>
                    <p><strong>Nume:</strong> {userInfo.nume || 'N/A'}</p>
                    <p><strong>Prenume:</strong> {userInfo.prenume || 'N/A'}</p>
                    <p><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
                    <p><strong>Telefon:</strong> {userInfo.telefon || 'N/A'}</p>

                    {/* Afișare abonament activ */}
                    {abonamentActiv ? (
                        <div className="abonament-info">
                            <h3>Abonament Activ</h3>
                            <p><strong>Nume Abonament:</strong> {abonamentActiv.abonament.nume_abonament}</p>
                            <p><strong>Preț:</strong> {abonamentActiv.abonament.pret} RON</p>
                            <p><strong>Zile Rămase:</strong> {abonamentActiv.zile_ramase_abonament} zile</p>
                        </div>
                    ) : (
                        <p><strong>Nu ai niciun abonament activ.</strong></p>
                    )}
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

                {/* Secțiunea pentru clase */}
                <div className="dashboard-clase-container">
                    <DashboardClase />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
