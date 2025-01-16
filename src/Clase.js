import React, { useState, useEffect } from 'react';
import './Form.css';

function Clase() {
    const [trainers, setTrainers] = useState([]);
    const [gyms, setGyms] = useState([]);
    const [formData, setFormData] = useState({
        className: '',
        capacity: '',
        trainer: '',
        startTime: '',
        endTime: '',
        classDate: '',
        gym: '',
    });

    // Fetch trainers
    useEffect(() => {
        async function fetchTrainers() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/angajati/');
                if (response.ok) {
                    const data = await response.json();
                    const trainers = data.filter(employee => employee.functie === 'trainer');
                    setTrainers(trainers);
                } else {
                    console.error('Failed to fetch trainers');
                }
            } catch (error) {
                console.error('Error fetching trainers:', error);
            }
        }

        fetchTrainers();
    }, []);

    useEffect(() => {
        async function fetchGymsForTrainer() {
            if (!formData.trainer) {
                setGyms([]); // Resetează lista de săli dacă trainer-ul nu este selectat
                return;
            }

            try {
                // Fetch relațiile din angajati_sali pe baza trainerului selectat
                const response = await fetch(`http://127.0.0.1:8000/api/angajati-sali/?id_angajat=${formData.trainer}`);
                if (response.ok) {
                    const relations = await response.json();

                    // Fetch detalii despre săli folosind id_sala din relații
                    const gymDetails = await Promise.all(
                        relations.map(async (relation) => {
                            const gymResponse = await fetch(`http://127.0.0.1:8000/api/sali-fitness/${relation.id_sala}/`);
                            if (gymResponse.ok) {
                                return await gymResponse.json();
                            }
                            console.error(`Failed to fetch gym details for ID ${relation.id_sala}`);
                            return null;
                        })
                    );

                    // Setează sălile în starea componentului, eliminând valorile nule
                    setGyms(gymDetails.filter((gym) => gym !== null));
                } else {
                    console.error('Failed to fetch gym relations for the trainer');
                }
            } catch (error) {
                console.error('Error fetching gyms for the trainer:', error);
            }
        }

        fetchGymsForTrainer();
    }, [formData.trainer]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/clase/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nume_clasa: formData.className,
                    capacitate_clasa: parseInt(formData.capacity, 10),
                    id_antrenor: formData.trainer,
                    ora_incepere: formData.startTime,
                    ora_inchidere: formData.endTime,
                    data_clasa: formData.classDate,
                    id_sala: formData.gym,
                }),
            });

            if (response.ok) {
                alert('Class created successfully!');
                setFormData({
                    className: '',
                    capacity: '',
                    trainer: '',
                    startTime: '',
                    endTime: '',
                    classDate: '',
                    gym: '',
                });
                setGyms([]); // Reset gyms
            } else {
                const data = await response.json();
                console.error(data);
                alert('Failed to create class. Check console for details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Create Class</h2>
            <form onSubmit={handleSubmit}>
                <label>Class Name</label>
                <input
                    type="text"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    placeholder="Enter class name"
                    required
                />

                <label>Capacity</label>
                <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Enter capacity"
                    required
                />

                <label>Trainer</label>
                <select
                    name="trainer"
                    value={formData.trainer}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select trainer</option>
                    {trainers.map((trainer) => (
                        <option key={trainer.id_angajat} value={trainer.id_angajat}>
                            {trainer.nume} {trainer.prenume}
                        </option>
                    ))}
                </select>

                <label>Gym</label>
                <select
                    name="gym"
                    value={formData.gym}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select gym</option>
                    {gyms.map((gym) => (
                        <option key={gym.id_sala} value={gym.id_sala}>
                            {gym.nume_sala}
                        </option>
                    ))}
                </select>


                <label>Start Time</label>
                <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                />

                <label>End Time</label>
                <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                />

                <label>Class Date</label>
                <input
                    type="date"
                    name="classDate"
                    value={formData.classDate}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Create Class</button>
            </form>
        </div>
    );
}

export default Clase;
