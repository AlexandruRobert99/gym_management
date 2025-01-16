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

    // 🔎 Fetch pentru traineri (doar cei cu funcția "trainer")
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

    // 🔎 Fetch pentru săli în funcție de trainerul selectat
    useEffect(() => {
        async function fetchGymsForTrainer() {
            if (!formData.trainer) {
                setGyms([]); // Resetăm sălile dacă nu e selectat niciun trainer
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/angajati-sali/`);
                if (response.ok) {
                    const relations = await response.json();

                    // Filtrăm sălile aferente trainerului selectat
                    const gymDetails = relations
                        .filter(relation => relation.id_angajat === parseInt(formData.trainer))
                        .map(relation => ({
                            id_sala: relation.id_sala,
                            nume_sala: relation.nume_sala
                        }));

                    setGyms(gymDetails);
                } else {
                    console.error('Failed to fetch gym relations for the trainer');
                }
            } catch (error) {
                console.error('Error fetching gyms for the trainer:', error);
            }
        }

        fetchGymsForTrainer();
    }, [formData.trainer]);

    // 📝 Actualizăm formularul la schimbarea inputului
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ Submit pentru creare clasă
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
                setGyms([]); // Resetăm sălile
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
                {/* 🏋️ Nume clasă */}
                <label>Class Name</label>
                <input
                    type="text"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    placeholder="Enter class name"
                    required
                />

                {/* 📊 Capacitate */}
                <label>Capacity</label>
                <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Enter capacity"
                    required
                />

                {/* 🧑‍🏫 Select Trainer */}
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
                            {trainer.prenume} {trainer.nume}
                        </option>
                    ))}
                </select>

                {/* 🏢 Select Gym */}
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

                {/* ⏰ Ora începerii */}
                <label>Start Time</label>
                <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                />

                {/* ⏳ Ora închiderii */}
                <label>End Time</label>
                <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                />

                {/* 📅 Data clasei */}
                <label>Class Date</label>
                <input
                    type="date"
                    name="classDate"
                    value={formData.classDate}
                    onChange={handleChange}
                    required
                />

                {/* 📤 Buton Submit */}
                <button type="submit">Create Class</button>
            </form>
        </div>
    );
}

export default Clase;
