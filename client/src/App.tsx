import { Link } from "react-router";
import "./App.css";
import HealthRecord from "./pages/HealthRecord";
import "./assets/styles/reset.css";

function App() {
  return (
    <>
      <Link to="/my-pets/:id">Mes animaux</Link>
      <HealthRecord />
    </>
  );
}

export default App;
