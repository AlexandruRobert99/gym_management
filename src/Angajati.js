import React from 'react';
import './Form.css';

function Angajati() {
    return (
        <div className="form-container">
            <h2>Register Employee</h2>
            <form>
                <label>First Name</label>
                <input type="text" placeholder="Enter first name" required />

                <label>Last Name</label>
                <input type="text" placeholder="Enter last name" required />

                <label>Position</label>
                <select required>
                    <option value="">Select position</option>
                    <option value="manager">Manager</option>
                    <option value="trainer">Trainer</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="cleaning_staff">Cleaning Staff</option>
                </select>

                <label>Hire Date</label>
                <input type="date" required />

                <label>Salary</label>
                <input type="number" placeholder="Enter salary" required />

                <label>Phone</label>
                <input type="tel" placeholder="Enter phone number" required />

                <label>Email</label>
                <input type="email" placeholder="Enter email address" required />

                <button type="submit">Register Employee</button>
            </form>
        </div>
    );
}

export default Angajati;
