import React from 'react';
import './Form.css';

function SaliFitness() {
    return (
        <div className="form-container">
            <h2>Register Fitness Center</h2>
            <form>
                <label>Center Name</label>
                <input type="text" placeholder="Enter center name" required />

                <label>Address</label>
                <input type="text" placeholder="Enter address" required />

                <label>City</label>
                <input type="text" placeholder="Enter city" required />

                <label>Phone</label>
                <input type="tel" placeholder="Enter phone number" required />

                <label>Email</label>
                <input type="email" placeholder="Enter email address" required />

                <label>Capacity</label>
                <input type="number" placeholder="Enter capacity" required />

                <button type="submit">Register Center</button>
            </form>
        </div>
    );
}

export default SaliFitness;
