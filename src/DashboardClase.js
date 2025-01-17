import React, { useState, useEffect } from 'react';
import './DashboardClase.css';

const DashboardClase = () => {
    const [clase, setClase] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    // Fetch clase disponibile
    useEffect(() => {
        async function fetchClase() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/clase/');
                if (response.ok) {
                    const data = await response.json();

                    const today = new Date();
                    const futureClasses = data.filter(clasa => new Date(clasa.data_clasa) >= today);
                    setClase(futureClasses);
                } else {
                    console.error('Failed to fetch classes');
                }
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        }

        fetchClase();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedClass(e.target.value);
    };

    const handleRegister = async () => {
        const clientId = localStorage.getItem('id_client');
        if (!selectedClass || !clientId) {
            alert("Selectează o clasă și asigură-te că ești logat.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/clase/${selectedClass}/inregistrare/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_client: clientId }),
            });

            if (response.ok) {
                alert("Înscriere realizată cu succes!");
                window.location.reload();
            } else {
                const data = await response.json();
                alert(data.error || "Înscrierea a eșuat.");
            }
        } catch (error) {
            console.error("Eroare:", error);
            alert("A apărut o eroare. Încearcă din nou.");
        }
    };

    const handleCancel = async () => {
        const clientId = localStorage.getItem('id_client');
        if (!selectedClass || !clientId) {
            alert("Selectează o clasă și asigură-te că ești logat.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/clase/${selectedClass}/anulare/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_client: clientId }),
            });

            if (response.ok) {
                alert("Înscriere anulată cu succes!");
                window.location.reload();
            } else {
                const data = await response.json();
                alert(data.error || "Anularea a eșuat.");
            }
        } catch (error) {
            console.error("Eroare:", error);
            alert("A apărut o eroare. Încearcă din nou.");
        }
    };

    const formatTime = (time) => time ? time.slice(0, 5) : '';

    return (
        <div className="dashboard-classes-container">
            <h3>Clase disponibile</h3>

            {/* Dropdown-ul pentru selectarea clasei */}
            <div className="class-actions">
                <select value={selectedClass} onChange={handleSelectChange}>
                    <option value="">Selectează o clasă</option>
                    {clase.map((clasa) => (
                        <option key={clasa.id_clasa} value={clasa.id_clasa}>
                            {clasa.nume_clasa} - {clasa.numar_participanti}/{clasa.capacitate_clasa}
                        </option>
                    ))}
                </select>

                <button onClick={handleRegister}>Înscrie-te</button>
                <button onClick={handleCancel}>Anulează</button>
            </div>

            {/* Grid pentru clase */}
            <div className="class-grid">
                {clase.length > 0 ? (
                    clase.map((clasa) => (
                        <div key={clasa.id_clasa} className="class-card">
                            <p><strong>{clasa.nume_clasa}</strong></p>
                            <p><strong>Data:</strong> {clasa.data_clasa}</p>
                            <p><strong>Ora:</strong> {formatTime(clasa.ora_incepere)} - {formatTime(clasa.ora_inchidere)}</p>
                            <p><strong>Capacitate:</strong> {clasa.numar_participanti}/{clasa.capacitate_clasa}</p>
                            <p><strong>Antrenor:</strong> {clasa.nume_antrenor}</p>
                            <p><strong>Sala:</strong> {clasa.nume_sala}</p>
                        </div>
                    ))
                ) : (
                    <p>Nu sunt clase disponibile.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardClase;
