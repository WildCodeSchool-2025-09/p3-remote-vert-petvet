import { Link } from "react-router";
import "./App.css";
import "./assets/styles/reset.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <HomePage />
      <Link to="/my-pets/1">Mes animaux</Link>
    </>
  );
}

export default App;
