import React, { useState, useEffect, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import DashboardClase from "./DashboardClase";
import './App.css';
import './Dashboard.css';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState({});
    const [abonamentActiv, setAbonamentActiv] = useState(null);
    const [saliAbonament, setSaliAbonament] = useState([]);

    const fetchSaliAbonament = useCallback(async (abonamentId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/abonamente-sali/`);
            if (response.ok) {
                const data = await response.json();
                const saliFiltrate = data
                    .filter(item => item.id_abonament === abonamentId)
                    .map(item => item.sala);
                setSaliAbonament(saliFiltrate);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchAbonamentActiv = useCallback(async (clientId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/plati/?id_client=${clientId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setAbonamentActiv(data[0]);
                    fetchSaliAbonament(data[0].abonament.id_abonament);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [fetchSaliAbonament]);

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
    }, [fetchAbonamentActiv]);

    return (
        <div>
            <h1 className="dashboard-title">Dashboard</h1>

            <div className="dashboard-layout">
                <div className="dashboard-info-container">
                    <h2>Informații Utilizator</h2>
                    <p><strong>Nume:</strong> {userInfo.nume || 'N/A'}</p>
                    <p><strong>Prenume:</strong> {userInfo.prenume || 'N/A'}</p>
                    <p><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
                    <p><strong>Telefon:</strong> {userInfo.telefon || 'N/A'}</p>

                    {abonamentActiv ? (
                        <div className="abonament-info">
                            <h3>Abonament Activ</h3>
                            <p><strong>Nume Abonament:</strong> {abonamentActiv.abonament.nume_abonament}</p>
                            <p><strong>Preț:</strong> {abonamentActiv.abonament.pret} RON</p>
                            <p><strong>Zile Rămase:</strong> {abonamentActiv.zile_ramase_abonament} zile</p>

                            <h4>Săli disponibile:</h4>
                            {saliAbonament.length > 0 ? (
                                <ul>
                                    {saliAbonament.map((sala) => (
                                        <li key={sala.id_sala}>
                                            <strong>{sala.nume_sala}</strong> - {sala.adresa}, {sala.oras}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Nu sunt săli disponibile pentru acest abonament.</p>
                            )}
                        </div>
                    ) : (
                        <p><strong>Nu ai niciun abonament activ.</strong></p>
                    )}
                </div>

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
            </div>

            <div className="dashboard-clase-container">
                <DashboardClase />
            </div>
        </div>
    );
};

export default Dashboard;
