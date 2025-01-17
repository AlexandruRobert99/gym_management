import React, { useState, useEffect } from 'react';
import CardAbonament from './CardAbonament';
import './App.css';

const PlataAbonament = () => {
    const [abonamenteSali, setAbonamenteSali] = useState([]);
    const [abonamentActiv, setAbonamentActiv] = useState(false);
    const clientId = localStorage.getItem('id_client');  // Preluăm ID-ul clientului logat

    // Verificare abonament activ
    useEffect(() => {
        async function fetchAbonamentActiv() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/plati/?id_client=${clientId}`);
                if (response.ok) {
                    const plati = await response.json();
                    const abonamentActiv = plati.some(plata => plata.zile_ramase_abonament > 0);
                    setAbonamentActiv(abonamentActiv);
                } else {
                    console.error('Eroare la verificarea abonamentului activ');
                }
            } catch (error) {
                console.error('Eroare:', error);
            }
        }

        if (clientId) {
            fetchAbonamentActiv();
        }
    }, [clientId]);

    // Aducem abonamentele disponibile
    useEffect(() => {
        async function fetchAbonamenteSali() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/abonamente-sali/');
                if (response.ok) {
                    const data = await response.json();

                    const groupedAbonamente = data.reduce((acc, item) => {
                        const abonamentId = item.abonament.id_abonament;
                        if (!acc[abonamentId]) {
                            acc[abonamentId] = {
                                ...item.abonament,
                                sali: [],
                            };
                        }
                        acc[abonamentId].sali.push(item.sala);
                        return acc;
                    }, {});

                    setAbonamenteSali(Object.values(groupedAbonamente));
                } else {
                    console.error('Eroare la încărcarea abonamentelor');
                }
            } catch (error) {
                console.error('Eroare:', error);
            }
        }

        fetchAbonamenteSali();
    }, []);

    return (
        <div className="abonamente-container">
            <h2>Abonamente Disponibile</h2>
            <div className="abonamente-grid">
                {abonamenteSali.length > 0 ? (
                    abonamenteSali.map((abonament) => (
                        <CardAbonament
                            key={abonament.id_abonament}
                            abonament={abonament}
                            abonamentActiv={abonamentActiv}  // Trimitem informația către CardAbonament
                        />
                    ))
                ) : (
                    <p>Nu există abonamente disponibile.</p>
                )}
            </div>
        </div>
    );
};

export default PlataAbonament;
