import React, { useState, useEffect } from 'react';

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
                    setClase(data);
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
        console.log("ID Client din localStorage:", clientId);

        if (!selectedClass || !clientId) {
            alert("Selectează o clasă și asigură-te că ești logat.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/clase/${selectedClass}/inregistrare/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_client: clientId }),
            });

            if (response.ok) {
                alert("Înscriere realizată cu succes!");
            } else {
                const data = await response.json();
                alert(data.error || "Înscrierea a eșuat.");
            }
        } catch (error) {
            console.error("Eroare:", error);
            alert("A apărut o eroare. Încearcă din nou.");
        }
    };

    return (
        <div className="dashboard-classes-container">
            <h3>Clase disponibile</h3>
            <select value={selectedClass} onChange={handleSelectChange}>
                <option value="">Selectează o clasă</option>
                {clase.map((clasa) => (
                    <option key={clasa.id_clasa} value={clasa.id_clasa}>
                        {clasa.nume_clasa} - {clasa.numar_participanti}/{clasa.capacitate_clasa}
                    </option>
                ))}
            </select>
            <button onClick={handleRegister}>Înscrie-te</button>
        </div>
    );
};

export default DashboardClase;
