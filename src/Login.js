import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', parola: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('rol', data.rol);

                // Salvăm datele în funcție de rol
                localStorage.setItem('token', data.token);
                localStorage.setItem('nume', data.nume);
                localStorage.setItem('prenume', data.prenume);
                localStorage.setItem('email', data.email);

                if (data.rol === 'client') {
                    localStorage.setItem('id_client', data.id_client);
                    localStorage.setItem('adresa', data.adresa);
                    localStorage.setItem('telefon', data.telefon);
                    localStorage.setItem('data_nasterii', data.data_nasterii);
                    localStorage.setItem('data_inscrierii', data.data_inscrierii);

                    // 🔵 Redirecționare către Dashboard pentru client
                    navigate('/dashboard');
                } else if (data.rol === 'manager') {
                    localStorage.setItem('id_angajat', data.id_angajat);
                    localStorage.setItem('functie', data.functie);

                    // 🔵 Redirecționare către Plăți pentru manager
                    navigate('/plati');
                } else {
                    setError('Rol necunoscut.');
                }

            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        }
    };


    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                    name="parola"
                    placeholder="Enter your password"
                    value={formData.parola}
                    onChange={handleChange}
                    required
                />

                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
