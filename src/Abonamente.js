import React from 'react';
import './Form.css';

function Abonamente() {
    return (
        <div className="form-container">
            <h2>Register Subscription</h2>
            <form>
                <label>Subscription Name</label>
                <input type="text" placeholder="Enter subscription name" required />

                <label>Price</label>
                <input type="number" step="0.01" placeholder="Enter price" required />

                <label>Validity (days)</label>
                <input type="number" placeholder="Enter validity in days" required />

                <label>Description</label>
                <textarea placeholder="Enter description" rows="4" required></textarea>

                <button type="submit">Register Subscription</button>
            </form>
        </div>
    );
}

export default Abonamente;
