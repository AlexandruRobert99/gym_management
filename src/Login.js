import React from 'react';
import './Form.css';

function Login() {
    return (
        <div className="form-container">
            <h2>Login</h2>
            <form>
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required />

                <label>Password</label>
                <input type="password" placeholder="Enter your password" required />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
