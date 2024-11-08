import './App.css';
import Login from "./Login";
import Register from "./Register";
import SaliFitness from "./SaliFitness";
import Angajati from "./Angajati";
import Abonamente from "./Abonamente";
import AngajatiSali from "./AngajatiSali";
import Clase from "./Clase";
import AbonamenteSali from "./AbonamenteSali";

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <p></p>
            <Login/>
            <p></p>
            <Register/>
            <p></p>
            <SaliFitness/>
            <p></p>
            <Angajati/>
            <p></p>
            <AngajatiSali/>
            <p></p>
            <Abonamente/>
            <p></p>
            <AbonamenteSali/>
            <p></p>
            <Clase/>
            <p></p>
        </header>
    </div>
  );
}

export default App;
