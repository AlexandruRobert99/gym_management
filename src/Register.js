import React from 'react';
import './Form.css';

function Register() {
    return (
        <div className="form-container">
            <h2>Register</h2>
            <form>
                <label>First Name</label>
                <input type="text" placeholder="Enter your first name" required />

                <label>Last Name</label>
                <input type="text" placeholder="Enter your last name" required />

                <label>Date of Birth</label>
                <input type="date" required />

                <label>Address</label>
                <input type="text" placeholder="Enter your address" required />

                <label>Phone</label>
                <input type="tel" placeholder="Enter your phone number" required />

                <label>Email</label>
                <input type="email" placeholder="Enter your email" required />

                <label>Password</label>
                <input type="password" placeholder="Enter a password" required />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
