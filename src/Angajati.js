import React, { useState } from 'react';
import './Form.css';

function Angajati() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        hireDate: '',
        salary: '',
        phone: '',
        email: '',
        password: '', // Parola va fi inclusă în formData
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
            const response = await fetch('http://127.0.0.1:8000/api/angajati/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nume: formData.lastName,
                    prenume: formData.firstName,
                    functie: formData.position,
                    data_angajarii: formData.hireDate,
                    salariu: parseFloat(formData.salary), // Convertim la float
                    telefon: formData.phone,
                    email: formData.email,
                    parola: formData.password, // Trimitere parola
                }),
            });

            if (response.ok) {
                alert('Employee registered successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    position: '',
                    hireDate: '',
                    salary: '',
                    phone: '',
                    email: '',
                    password: '',
                });
            } else {
                const data = await response.json();
                console.error(data);
                alert('Failed to register employee. Check console for details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Register Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                />

                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                />

                <label>Position</label>
                <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select position</option>
                    <option value="manager">Manager</option>
                    <option value="trainer">Trainer</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="cleaning_staff">Cleaning Staff</option>
                </select>

                <label>Hire Date</label>
                <input
                    type="date"
                    name="hireDate"
                    value={formData.hireDate}
                    onChange={handleChange}
                    required
                />

                <label>Salary</label>
                <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                    required
                />

                <label>Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                />

                <button type="submit">Register Employee</button>
            </form>
        </div>
    );
}

export default Angajati;
