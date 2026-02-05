import { useState } from "react";
import "../assets/styles/register.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orderNb, setOrderNb] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  return (
    <>
      <form className="form-register" action="">
        <label htmlFor="firstname">
          {"Prénom : "}
          <input
            type="text"
            id="firstname"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Prénom"
          />
        </label>
        <label htmlFor="lastname">
          {"Nom : "}
          <input
            type="text"
            id="lastname"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nom"
          />
        </label>
        <label htmlFor="orderNb">
          {"Numéro d'ordre: "}
          <input
            type="number"
            id="orderNb"
            required
            value={orderNb ?? ""}
            onChange={(e) => {
              const temporaryValue = e.target.value;
              setOrderNb(temporaryValue === "" ? null : Number(temporaryValue));
            }}
            placeholder="Numéro d'ordre"
          />
        </label>
        <label htmlFor="email">
          {"Email : "}
          <input type="text" id="email" placeholder="Adresse mail" />
        </label>
        <label htmlFor="password">
          {"Mot de passe : "}
          <input
            type="text"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
        </label>
        <label htmlFor="confirmedPassword">
          {"Confirmez le mot de passe : "}
          <input
            type="text"
            id="confirmedPassword"
            required
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            placeholder="Confirmez le mot de passe"
          />
        </label>
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}

export default Register;
