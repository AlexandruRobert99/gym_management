import React, { useState, useEffect } from 'react';
import './Form.css';

function AngajatiSali() {
    const [employees, setEmployees] = useState([]);
    const [gyms, setGyms] = useState([]);
    const [formData, setFormData] = useState({
        employee: '',
        gym: '',
    });

    // Fetch employees
    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/angajati/');
                if (response.ok) {
                    const data = await response.json();
                    setEmployees(data);
                } else {
                    console.error('Failed to fetch employees');
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }

        fetchEmployees();
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
            const response = await fetch('http://127.0.0.1:8000/api/angajati-sali/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_angajat: formData.employee,
                    id_sala: formData.gym,
                }),
            });

            if (response.ok) {
                alert('Employee assigned to gym successfully!');
                setFormData({
                    employee: '',
                    gym: '',
                });
            } else {
                const data = await response.json();
                console.error(data);
                alert('Failed to assign employee to gym. Check console for details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Assign Employee to Gym</h2>
            <form onSubmit={handleSubmit}>
                <label>Employee</label>
                <select
                    name="employee"
                    value={formData.employee}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select employee</option>
                    {employees.map((employee) => (
                        <option key={employee.id_angajat} value={employee.id_angajat}>
                            {employee.nume} {employee.prenume}
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

                <button type="submit">Assign Employee</button>
            </form>
        </div>
    );
}

export default AngajatiSali;
