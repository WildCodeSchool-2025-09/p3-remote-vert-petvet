//import { useState } from "react";
import styles from "../assets/styles/navBar.module.css";

function NavBar({ isVet = false }) {
  //const [menuBurger, setMenuBurger] = useState(false);
  // Il faut récupérer l'id du user dans le context, faker pour l'instant
  const userid = 5;
  const vetNavButtons = [
    { label: "Tableau de bord", href: "/" },
    { label: "Mes animaux suivis", href: "/my-patients/" },
    { label: "Rappels", href: "/reminders" },
  ];

  const ownerNavButtons = [
    { label: "Tableau de bord", href: "/" },
    { label: "Mes animaux", href: `/my-pets/${userid}` },
    { label: "Rappels", href: "/reminders" },
    { label: "Documents", href: "#" },
    { label: "Urgences", href: "#" },
    { label: "Le saviez-vous ?", href: "#" },
    { label: "Contacts utiles", href: "#" },
  ];

  const navButtons = isVet ? vetNavButtons : ownerNavButtons;

  return (
    <nav className={styles.navBar}>
      <button type="button" className={styles.burgerButton}>
        ☰
      </button>
      <div className={styles.navButtons}>
        {navButtons.map((button) => (
          <a key={button.label} href={button.href} className={styles.navLink}>
            <div className={styles.navButtonContent}>
              <img src="/images/paw.png" alt="paw" className={styles.paw} />
              <span>{button.label}</span>
            </div>
          </a>
        ))}
      </div>
      <div className={styles.deconnexionContainer}>
        <a href="/login" className={styles.navLink}>
          <div className={styles.navButtonContent}>
            <img src="/images/paw.png" alt="paw" className={styles.paw} />
            <span>Déconnexion</span>
          </div>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
