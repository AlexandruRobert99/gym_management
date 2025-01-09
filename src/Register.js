import React, { useState } from 'react';
import './Form.css';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne reîncărcarea paginii

        try {
            const response = await fetch('http://127.0.0.1:8000/api/clienti/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nume: formData.lastName,
                    prenume: formData.firstName,
                    data_nasterii: formData.dateOfBirth,
                    adresa: formData.address,
                    telefon: formData.phone,
                    email: formData.email,
                    parola: formData.password, // Parola hash-uită va fi gestionată în backend
                    data_inscrierii: new Date().toISOString().split('T')[0] // Data curentă
                })
            });

            if (response.ok) {
                alert('Account created successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    address: '',
                    phone: '',
                    email: '',
                    password: ''
                });
            } else {
                const data = await response.json();
                console.error(data);
                alert('Failed to register. Check console for details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />

                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />

                <label>Date of Birth</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                />

                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <label>Phone</label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
