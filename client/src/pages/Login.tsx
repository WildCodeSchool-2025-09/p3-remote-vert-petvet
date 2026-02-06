import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate } from "react-router";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [, setUser] = useState(null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      if (response.status === 200) {
        const user = await response.json();
        setUser(user);
        navigate("/");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label> {""}
        <input ref={emailRef} type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label> {""}
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <button type="submit"> Se connecter</button>
    </form>
  );
}

export default Login;
