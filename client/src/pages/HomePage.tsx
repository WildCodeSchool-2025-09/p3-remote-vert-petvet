import "../assets/styles/reset.css";
import "../assets/styles/homePage.css";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        }
      },
      {
        threshold: 0.5,
      },
    );
    const elements = document.querySelectorAll(".reveal, .reveal-img");
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header>
        <nav>
          <div className="logo-container">
            <img
              src="/images/green/logo.png"
              alt="PetVet Logo vert"
              className="logo logo1 reveal from-right"
              width="120px"
            />
            <img
              src="/images/blue/logo.png"
              alt="PetVet Logo bleu"
              className="logo logo2 reveal from-left"
              width="120px"
            />
          </div>

          <ul>
            <button type="button" className="button-homePage reveal from-left">
              <img src="/images/paw.png" alt="Pattoune Icon" width="15" />
              Contacts utiles
            </button>
            <button type="button" className="button-homePage reveal from-left">
              <img src="/images/paw.png" alt="Pattoune Icon" width="15" />
              Me connecter
            </button>
            <button type="button" className="button-homePage reveal from-left">
              <img src="/images/paw.png" alt="Pattoune Icon" width="15" />
              M'inscrire
            </button>
          </ul>

          <h1 className="reveal">Pet&Vet</h1>
        </nav>

        <h2 className="reveal">Bienvenue sur Pet&Vet !</h2>
      </header>
      <main>
        <section className="intro">
          <h1>
            Pet&Vet : avec vous pour vous accompagner dans le suivis de vos
            animaux
          </h1>
          <div className="intro-section">
            <div className="intro-text">
              <h2>Le carnet de santé numérique Pour tous les animaux</h2>
              <p>
                Le premier carnet de santé numérique pour tous les animaux de
                compagnie, entièrement gratuit et disponible sur smartphone.
              </p>
              <span className="reveal from-bottom">
                ATTENTION : l'utilisation de ce site ne remplace pas l'avis d'un
                vétérinaire.
              </span>
            </div>

            <img
              src="/images/dog-cat.jpg"
              alt="Chien et chat assis"
              width="500px"
              className="reveal from-right"
            />
          </div>
        </section>
        <section className="individuals">
          <h1>Particuliers et passionnés</h1>
          <h2>Tout le suivi de vos animaux dans une seule application!</h2>
          <div className="individuals-text-and-image">
            <div className="individuals-text">
              <p>
                Peu importe l'espèce de vos compagnons, Pet&Vet simplifie leur
                suivi de santé grâce à un carnet numérique interactif et
                gratuit.
              </p>
              <p>
                Créez des profils personnalisés pour chacun d'entre eux,
                programmez vos alertes pour ne plus oublier aucun rendez-vous et
                partagez instantanément leurs données médicales avec votre
                vétérinaire.
              </p>
              <p>
                Profitez d'un espace personnel sécurisé et accessible à tout
                moment pour veiller sereinement sur tous vos animaux.
              </p>
            </div>
            <img
              src="/images/cat-hand.jpg"
              alt="Chat qui tape dans la main"
              width="300px"
              className="reveal from-left"
            />
          </div>
        </section>

        <section className="professionals">
          <h1>L’allié numérique des experts de la santé animale</h1>
          <div className="professionals-text-and-image">
            <div className="professionals-text">
              <p>
                Vétérinaires et ASV, optimisez l'observance de vos soins grâce à
                Pet&Vet, l'outil numérique gratuit qui connecte votre expertise
                au quotidien des propriétaires.
              </p>
              <p>
                Plus qu’un carnet de santé, l’application vous permet d'ajouter
                et de consulter l'historique des visites, tout en gardant un œil
                sur le suivi de chaque animal.
              </p>
              <p>
                En coordonnant les traitements et les rappels directement avec
                vos clients, vous modernisez votre pratique et garantissez une
                meilleure réussite thérapeutique.
              </p>
            </div>
            <img
              src="/images/rabbit.jpg"
              alt="Lapin"
              width="400px"
              className="reveal from-right"
            />
          </div>
        </section>

        <section className="associations">
          <h1>Associations,</h1>
          <h2>
            L’outil gratuit pour optimiser la gestion de votre association
          </h2>
          <div className="associations-text-and-image">
            <div className="associations-text">
              <p>
                Gagnez en efficacité grâce à notre plateforme web dédiée qui
                centralise tous les carnets de santé numériques de vos animaux
                en attente d'adoption.
              </p>
            </div>
            <img
              src="/images/dog-window.jpg"
              alt="Chien regardant par la fenêtre"
              width="300px"
              className="reveal from-bottom"
            />
          </div>
        </section>
        <section className="buttons-bottom">
          <div className="button-contacts-utile">
            <button type="button" className="button-homePage reveal from-right">
              <img src="/images/paw.png" alt="Pattoune Icon" width="20" />
              Contacts utiles
            </button>
          </div>
          <div className="button-register-login">
            <button type="button" className="button-homePage reveal from-right">
              <img src="/images/paw.png" alt="Pattoune Icon" width="20" />
              Me connecter
            </button>
            <button type="button" className="button-homePage reveal from-right">
              <img src="/images/paw.png" alt="Pattoune Icon" width="20" />
              M'inscrire
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
