import React, { useState, useEffect } from 'react';
import './App.css';

const PlatiAdmin = () => {
    const [plati, setPlati] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlati = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/plati/');
                if (response.ok) {
                    const data = await response.json();
                    setPlati(data);
                } else {
                    console.error("Eroare la preluarea datelor despre plăți.");
                }
            } catch (error) {
                console.error("Eroare:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlati();
    }, []);

    if (loading) {
        return <p>Se încarcă istoricul plăților...</p>;
    }

    return (
        <div className="plati-admin-container">
            <h2>Istoric Plăți</h2>
            {plati.length > 0 ? (
                <table className="plati-table">
                    <thead>
                    <tr>
                        <th>ID Plată</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Abonament</th>
                        <th>Suma</th>
                        <th>Data Plății</th>
                        <th>Zile Rămase</th>
                    </tr>
                    </thead>
                    <tbody>
                    {plati.map((plata) => (
                        <tr key={plata.id_plata}>
                            <td>{plata.id_plata}</td>
                            <td>{plata.client.nume} {plata.client.prenume}</td>
                            <td>{plata.client.email}</td>
                            <td>{plata.client.telefon}</td>
                            <td>{plata.abonament.nume_abonament}</td>
                            <td>{plata.suma} RON</td>
                            <td>{plata.data_platii}</td>
                            <td>{plata.zile_ramase_abonament} zile</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Nu există plăți înregistrate.</p>
            )}
        </div>
    );
};

export default PlatiAdmin;
