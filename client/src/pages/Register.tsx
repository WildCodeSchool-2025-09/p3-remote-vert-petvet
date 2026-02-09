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
  const [isVet, setIsVet] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const navigate = useNavigate();
  const currentFirstName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFirstName(event.target.value);
  };

  const currentLastName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLastName(event.target.value);
  };

  const currentOrderNb: ChangeEventHandler<HTMLInputElement> = (event) => {
    const temporaryValue = event.target.value;
    setOrderNb(temporaryValue === "" ? null : Number(temporaryValue));
  };

  const currentPassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value);
  };

  const currentConfirmPassword: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setConfirmedPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmedPasswordVisibility = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
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
      setErrors(data.errors);

      if (response.status === 201) {
        navigate("/");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-page">
      <nav className="nav-register">
        <img
          src={isVet ? "/images/blue/logo.png" : "/images/green/logo.png"}
          alt="logo-petvet"
          className="logo-register"
        />
        <button
          type="button"
          className="button-home-registerPage"
          onClick={() => navigate("/")}
        >
          <img src="/images/paw.png" alt="paw" className="paw-register" />
          Accueil
        </button>
        <h1>Pet&Vet</h1>
      </nav>

      <div className="toggle-wrapper-register">
        <input
          type="checkbox"
          id="mode-switch-register"
          checked={isVet}
          onChange={() => setIsVet(!isVet)}
        />
        <label htmlFor="mode-switch-register" className="toggle-label-register">
          <span className={`label-text ${!isVet ? "active" : ""}`}>
            Propriétaire
          </span>
          <span className={`label-text ${isVet ? "active" : ""}`}>
            Vétérinaire
          </span>
          <div className="switch-slider" />
        </label>
      </div>

      <div className="form-section-register">
        <form className="form-register" onSubmit={sendRegister}>
          <label htmlFor="firstname">
            {"Prénom : "}
            <input
              type="text"
              id="firstname"
              required
              value={firstName}
              onChange={currentFirstName}
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
              onChange={currentLastName}
              placeholder="Nom"
            />
          </label>
          {isVet && (
            <label htmlFor="orderNb">
              {"Numéro d'ordre: "}
              <input
                type="number"
                id="orderNb"
                min={1000}
                max={99999}
                required
                value={orderNb ?? ""}
                onChange={currentOrderNb}
                placeholder="Numéro d'ordre"
              />
            </label>
          )}
          <label htmlFor="email">
            {"Email : "}
            <input
              type="email"
              ref={emailRef}
              id="email"
              required
              placeholder="Adresse mail"
            />
          </label>
          <label htmlFor="password">
            {"Mot de passe : "}
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={currentPassword}
                placeholder="Mot de passe"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{ outline: "none" }}
              >
                {showPassword ? (
                  <img
                    src="/images/eye-hide.png"
                    alt="Masquer"
                    className="eye-visibility"
                  />
                ) : (
                  <img
                    src="/images/eye-show.png"
                    alt="Afficher"
                    className="eye-visibility"
                  />
                )}
              </button>
            </div>
          </label>
          <label htmlFor="confirmedPassword">
            <div className="confirm-password-label">
              <span>Confirmez le mot de passe :</span>
              {password && (
                <img
                  src={
                    password === confirmedPassword
                      ? "/images/matching-password.png"
                      : "/images/no-matching-password.png"
                  }
                  alt={
                    password === confirmedPassword
                      ? "Mots de passe identiques"
                      : "Mots de passe différents"
                  }
                />
              )}
            </div>
            <div className="password-input-container">
              <input
                type={showConfirmedPassword ? "text" : "password"}
                id="confirmedPassword"
                required
                value={confirmedPassword}
                onChange={currentConfirmPassword}
                placeholder="Confirmez le mot de passe"
              />
              <button
                type="button"
                onClick={toggleConfirmedPasswordVisibility}
                style={{ outline: "none" }}
              >
                {showConfirmedPassword ? (
                  <img
                    src="/images/eye-hide.png"
                    alt="Masquer"
                    className="eye-visibility"
                  />
                ) : (
                  <img
                    src="/images/eye-show.png"
                    alt="Afficher"
                    className="eye-visibility"
                  />
                )}
              </button>
            </div>
          </label>
          {errors.map((error) => {
            return (
              <p key={error.field} className="register-error">
                {error.message}
              </p>
            );
          })}
          <button
            type="submit"
            className={`button-submit ${isVet ? "btn-blue" : "btn-green"}`}
          >
            Enregistrer
          </button>
        </form>
        <section className="section-register">
          {isVet ? (
            <>
              <h2>Inscription Veterinaire </h2>
              <img
                src="/images/blue/stetoscope.png"
                alt="stetoscope"
                className="image-section-register"
              />
              <div className="section-register-text">
                <p>Bienvenue sur Pet&Vet !</p>
                <p>
                  En tant que vétérinaire, tu auras la possibilité de suivre tes
                  patients, rédiger des consultations et suivre leurs activités
                </p>
              </div>
            </>
          ) : (
            <>
              <h2>Inscription Propriétaire </h2>
              <img
                src="/images/green/calendar.png"
                alt="calendar"
                className="image-section-register"
              />
              <div className="section-register-text">
                <p>Bienvenue sur Pet&Vet !</p>
                <p>
                  En tant que propiétaire, tu auras la possibilité de suivre
                  tous tes animaux, te créer des rappels, et acccéder aux
                  consultations de leurs vétérinaires !
                </p>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Register;
