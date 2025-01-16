import React, { useState } from 'react';
import './Form.css';

function Abonamente() {
    const [formData, setFormData] = useState({
        subscriptionName: '',
        price: '',
        validity: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/abonamente/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nume_abonament: formData.subscriptionName,
                    pret: parseFloat(formData.price), // Convertim în float pentru backend
                    valabilitate: parseInt(formData.validity, 10), // Convertim în număr întreg
                    descriere: formData.description
                })
            });

            if (response.ok) {
                alert('Subscription registered successfully!');
                setFormData({
                    subscriptionName: '',
                    price: '',
                    validity: '',
                    description: ''
                });
            } else {
                const data = await response.json();
                console.error(data);
                alert('Failed to register subscription. Check console for details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };


    return (
        <div className="form-container">
            <h2>Register Subscription</h2>
            <form onSubmit={handleSubmit}>
                <label>Subscription Name</label>
                <input
                    type="text"
                    name="subscriptionName"
                    value={formData.subscriptionName}
                    onChange={handleChange}
                    placeholder="Enter subscription name"
                    required
                />

                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    placeholder="Enter price"
                    required
                />

                <label>Validity (days)</label>
                <input
                    type="number"
                    name="validity"
                    value={formData.validity}
                    onChange={handleChange}
                    placeholder="Enter validity in days"
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    rows="4"
                    required
                ></textarea>

                <button type="submit">Register Subscription</button>
            </form>
        </div>
    );
}

export default Abonamente;
