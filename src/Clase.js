import React from 'react';
import './Form.css';

function Clase() {
    return (
        <div className="form-container">
            <h2>Create Class</h2>
            <form>
                <label>Class Name</label>
                <input type="text" placeholder="Enter class name" required />

                <label>Capacity</label>
                <input type="number" placeholder="Enter capacity" required />

                <label>Trainer</label>
                <select required>
                    <option value="">Select trainer</option>
                    <option value="1">Trainer 1</option>
                    <option value="2">Trainer 2</option>
                    <option value="3">Trainer 3</option>
                    {/* Adaugă alți antrenori aici */}
                </select>

                <label>Start Time</label>
                <input type="time" required />

                <label>End Time</label>
                <input type="time" required />

                <label>Class Date</label>
                <input type="date" required />

                <label>Gym</label>
                <select required>
                    <option value="">Select gym</option>
                    <option value="101">Gym Center 1</option>
                    <option value="102">Gym Center 2</option>
                    <option value="103">Gym Center 3</option>
                    {/* Adaugă alte săli aici */}
                </select>

                <button type="submit">Create Class</button>
            </form>
        </div>
    );
}

export default Clase;
