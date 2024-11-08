import React from 'react';
import './Form.css';

function AbonamenteSali() {
    return (
        <div className="form-container">
            <h2>Assign Subscription to Gym</h2>
            <form>
                <label>Subscription</label>
                <select required>
                    <option value="">Select subscription</option>
                    <option value="1">Subscription 1</option>
                    <option value="2">Subscription 2</option>
                    <option value="3">Subscription 3</option>
                    {/* Adaugă alte abonamente aici */}
                </select>

                <label>Gym</label>
                <select required>
                    <option value="">Select gym</option>
                    <option value="101">Gym Center 1</option>
                    <option value="102">Gym Center 2</option>
                    <option value="103">Gym Center 3</option>
                    {/* Adaugă alte săli aici */}
                </select>

                <label>Start Date</label>
                <input type="date" required />

                <button type="submit">Assign Subscription</button>
            </form>
        </div>
    );
}

export default AbonamenteSali;
