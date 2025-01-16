import React, { useState, useEffect } from 'react';
import './Form.css';

function AbonamenteSali() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [gyms, setGyms] = useState([]);
    const [formData, setFormData] = useState({
        subscription: '',
        gym: '',
        startDate: '',
    });

    // Fetch subscriptions
    useEffect(() => {
        async function fetchSubscriptions() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/abonamente/');
                if (response.ok) {
                    const data = await response.json();
                    setSubscriptions(data);
                } else {
                    console.error('Failed to fetch subscriptions');
                }
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        }

        fetchSubscriptions();
    }, []);

    // Fetch gyms
    useEffect(() => {
        async function fetchGyms() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/sali-fitness/');
                if (response.ok) {
                    const data = await response.json();
                    setGyms(data);
                } else {
                    console.error('Failed to fetch gyms');
                }
            } catch (error) {
                console.error('Error fetching gyms:', error);
            }
        }

        fetchGyms();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/abonamente-sali/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_abonament: formData.subscription,
                    id_sala: formData.gym,
                    start_date: formData.startDate,
                }),
            });

            if (response.ok) {
                alert('Subscription assigned successfully!');
                setFormData({
                    subscription: '',
                    gym: '',
                    startDate: '',
                });
            } else {
                const data = await response.json();
                console.error(data);
                alert('Failed to assign subscription. Check console for details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Assign Subscription to Gym</h2>
            <form onSubmit={handleSubmit}>
                <label>Subscription</label>
                <select
                    name="subscription"
                    value={formData.subscription}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select subscription</option>
                    {subscriptions.map((subscription) => (
                        <option key={subscription.id_abonament} value={subscription.id_abonament}>
                            {subscription.nume_abonament}
                        </option>
                    ))}
                </select>

                <label>Gym</label>
                <select name="gym" value={formData.gym} onChange={handleChange} required>
                    <option value="">Select gym</option>
                    {gyms.map((gym) => (
                        <option key={gym.id_sala} value={gym.id_sala}>
                            {gym.nume_sala}
                        </option>
                    ))}
                </select>

                <label>Start Date</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Assign Subscription</button>
            </form>
        </div>
    );
}

export default AbonamenteSali;
