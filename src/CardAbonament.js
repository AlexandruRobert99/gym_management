import React, { useState, useEffect } from 'react';
import './App.css';

const CardAbonament = ({ abonament }) => {
    const [areAbonamentActiv, setAreAbonamentActiv] = useState(false);

    // Verifică dacă utilizatorul are deja un abonament activ (indiferent de tip)
    useEffect(() => {
        const verificaAbonamentActiv = async () => {
            const clientId = localStorage.getItem('id_client');

            if (clientId) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/plati/?id_client=${clientId}`);
                    if (response.ok) {
                        const data = await response.json();

                        // Verificăm dacă utilizatorul are orice abonament activ
                        const abonamentActiv = data.some(item => item.zile_ramase_abonament > 0);

                        setAreAbonamentActiv(abonamentActiv);
                    }
                } catch (error) {
                    console.error("Eroare la verificarea abonamentului:", error);
                }
            }
        };

        verificaAbonamentActiv();
    }, []);

    // Funcție pentru achiziționarea unui abonament
    const handlePurchase = async () => {
        const clientId = localStorage.getItem('id_client');

        if (!clientId) {
            alert("Trebuie să fii logat pentru a cumpăra un abonament.");

            return;
        }

        if (areAbonamentActiv) {
            alert("Ai deja un abonament activ.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/plati/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_client: clientId,
                    id_abonament: abonament.id_abonament,
                    suma: abonament.pret,
                }),
            });

            if (response.ok) {
                alert(`Ai achiziționat cu succes abonamentul: ${abonament.nume_abonament}`);
                setAreAbonamentActiv(true); // Blocăm achiziționarea altor abonamente
                window.location.reload();
            } else {
                const data = await response.json();
                alert(data.error || "Achiziția a eșuat.");
            }
        } catch (error) {
            console.error("Eroare la achiziție:", error);
            alert("A apărut o eroare. Încearcă din nou.");
        }
    };

    return (
        <div className="card-abonament">
            <h3>{abonament.nume_abonament}</h3>
            <p><strong>Preț:</strong> {abonament.pret} RON</p>
            <p><strong>Valabilitate:</strong> {abonament.valabilitate} zile</p>
            <p><strong>Descriere:</strong> {abonament.descriere}</p>

            <h4>Săli disponibile:</h4>
            {abonament.sali.map((sala) => (
                <div key={sala.id_sala} className="sala-info">
                    <p><strong>Sală:</strong> {sala.nume_sala}</p>
                    <p><strong>Adresă:</strong> {sala.adresa}</p>
                    <p><strong>Telefon:</strong> {sala.telefon}</p>
                    <p><strong>Oraș:</strong> {sala.oras}</p>
                    <p><strong>Capacitate:</strong> {sala.capacitate_sala}</p>
                </div>
            ))}

            <button
                className="purchase-button"
                onClick={handlePurchase}
                disabled={areAbonamentActiv}
            >
                {areAbonamentActiv ? "Ai deja un abonament activ" : "Cumpără"}
            </button>
        </div>
    );
};

export default CardAbonament;
