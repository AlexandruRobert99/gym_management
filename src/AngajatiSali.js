import React from 'react';
import './Form.css';

function AngajatiSali() {
    return (
        <div className="form-container">
            <h2>Assign Employee to Gym</h2>
            <form>
                <label>Employee</label>
                <select required>
                    <option value="">Select employee</option>
                    <option value="1">John Doe</option>
                    <option value="2">Jane Smith</option>
                    <option value="3">Alex Johnson</option>
                    {/* Adaugă aici alți angajați, dacă este necesar */}
                </select>

                <label>Gym</label>
                <select required>
                    <option value="">Select gym</option>
                    <option value="101">Gym Center 1</option>
                    <option value="102">Gym Center 2</option>
                    <option value="103">Gym Center 3</option>
                    {/* Adaugă aici alte săli, dacă este necesar */}
                </select>

                <button type="submit">Assign Employee</button>
            </form>
        </div>
    );
}

export default AngajatiSali;
