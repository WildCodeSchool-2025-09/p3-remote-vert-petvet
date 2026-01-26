import { Link } from "react-router";
import "./App.css";
import HealthRecord from "./components/HealthRecord";

function App() {
  return (
    <>
      <Link to="/my-pets/:id">Mes animaux</Link>
      <HealthRecord />
    </>
  );
}

export default App;
