import './App.css';
import Login from "./Login";
import Register from "./Register";
import SaliFitness from "./SaliFitness";
import Angajati from "./Angajati";
import Abonamente from "./Abonamente";
import AngajatiSali from "./AngajatiSali";
import Clase from "./Clase";
import AbonamenteSali from "./AbonamenteSali";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                {/* Bara de navigare */}
                <header className="App-header">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/sali-fitness">Săli Fitness</Link></li>
                            <li><Link to="/angajati">Angajați</Link></li>
                            <li><Link to="/clase">Clase</Link></li>
                            <li><Link to="/abonamente">Abonamente</Link></li>
                            <li><Link to="/angajati-sali">Angajați Săli</Link></li>
                            <li><Link to="/abonamente-sali">Abonamente Săli</Link></li>
                        </ul>
                    </nav>
                </header>

                {/* Configurare rute */}
                <main>
                    <Routes>
                        <Route path="/" element={<h1>Bun venit la aplicația de management pentru sălile de fitness!</h1>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/sali-fitness" element={<SaliFitness />} />
                        <Route path="/angajati" element={<Angajati />} />
                        <Route path="/clase" element={<Clase />} />
                        <Route path="/abonamente" element={<Abonamente />} />
                        <Route path="/angajati-sali" element={<AngajatiSali />} />
                        <Route path="/abonamente-sali" element={<AbonamenteSali />} />
                        <Route path="*" element={<h1>Pagina nu a fost găsită</h1>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
