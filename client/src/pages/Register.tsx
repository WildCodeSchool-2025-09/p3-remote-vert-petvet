import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import "../assets/styles/register.css";
import { useNavigate } from "react-router";

type ApiError = {
  field: string | undefined;
  message: string | undefined;
};

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orderNb, setOrderNb] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errors, setErrors] = useState<ApiError[]>([]);

  const navigate = useNavigate();
  // pensez a renommer les handles
  const handlefirstNameChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setLastName(event.target.value);
  };

  const handleOrderNbChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const temporaryValue = event.target.value;
    setOrderNb(temporaryValue === "" ? null : Number(temporaryValue));
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setConfirmedPassword(event.target.value);
  };

  const sendRegister: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          orderNb,
          email: (emailRef.current as HTMLInputElement).value,
          password,
        }),
      });

      const data = await response.json();
      console.log(data.errors);
      setErrors(data.errors);

      if (response.status === 201) {
        navigate("/"); // Mettre le path de la page login lors de l'US12_login
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Mettre un bouton pour changer le type de formulaire
    <>
      {errors.map((error) => {
        return <p key={error.field}>{error.message}</p>;
      })}
      <form className="form-register" onSubmit={sendRegister}>
        <label htmlFor="firstname">
          {"Prénom : "}
          <input
            type="text"
            id="firstname"
            required
            value={firstName}
            onChange={handlefirstNameChange}
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
            onChange={handleLastNameChange}
            placeholder="Nom"
          />
        </label>
        <label htmlFor="orderNb">
          {
            "Numéro d'ordre: " /* pour le numero d'ordre, il faudra display none en fonction 
          du choix propriétaire ou vétérinaire*/
          }
          <input
            type="number"
            id="orderNb"
            required
            value={orderNb ?? ""}
            onChange={handleOrderNbChange}
            placeholder="Numéro d'ordre"
          />
        </label>
        <label htmlFor="email">
          {"Email : "}
          <input
            type="email"
            ref={emailRef}
            id="email"
            placeholder="Adresse mail"
          />
        </label>
        <label htmlFor="password">
          {
            "Mot de passe : " /* Il reste la gestion de la sécurité de MDP et que la comparaison soit faites */
          }
          <input
            type="text"
            id="password"
            required
            value={password}
            onChange={handlePasswordChange}
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
            onChange={handleConfirmPasswordChange}
            placeholder="Confirmez le mot de passe"
          />
        </label>
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}

export default Register;
