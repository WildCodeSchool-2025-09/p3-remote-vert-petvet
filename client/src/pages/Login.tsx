import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [, setLoading] = useState(false);

  const auth = useAuth();

  const userLogin: FormEventHandler = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: (emailRef.current as HTMLInputElement).value,
          password: (passwordRef.current as HTMLInputElement).value,
        }),
      });

      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      if (response.status === 200) {
        const user = await response.json();
        auth?.login(user);
        navigate("/");
      }
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p>{error}</p>
      <form onSubmit={userLogin}>
        <div>
          <label htmlFor="email">Email</label> {""}
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Adresse mail"
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label> {""}
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Mot de passe"
          />
        </div>
        <button type="submit"> Se connecter</button>
      </form>
    </>
  );
}

export default Login;
