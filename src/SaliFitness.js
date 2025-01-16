import React, { useState } from "react";

const SaliFitness = () => {
    const [formData, setFormData] = useState({
        centerName: '',
        address: '',
        city: '',
        phone: '',
        email: '',
        capacity: ''
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
            const response = await fetch('http://127.0.0.1:8000/api/sali-fitness/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nume_sala: formData.centerName,
                    adresa: formData.address,
                    oras: formData.city,
                    telefon: formData.phone,
                    email: formData.email,
                    capacitate_sala: parseInt(formData.capacity, 10) // Asigurăm că este un număr
                })
            });

            if (response.ok) {
                alert('Fitness center registered successfully!');
                setFormData({
                    centerName: '',
                    address: '',
                    city: '',
                    phone: '',
                    email: '',
                    capacity: ''
                });
            } else {
                const data = await response.json();
                console.error(data);
                alert('Failed to register fitness center. Check console for details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Register Fitness Center</h2>
            <form onSubmit={handleSubmit}>
                <label>Center Name</label>
                <input
                    type="text"
                    name="centerName" // Aici am corectat name
                    value={formData.centerName}
                    onChange={handleChange}
                    required
                />
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <label>City</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                <label>Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Capacity</label>
                <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register Center</button>
            </form>
        </div>
    );
};

export default SaliFitness;
