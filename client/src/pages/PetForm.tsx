import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "../assets/styles/petForm.module.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import type { CreatePet, Gender, Specie } from "../types/Pet";

function PetForm() {
  const [name, setName] = useState("");
  const [tattooNb, setTattooNb] = useState("");
  const [chipNb, setChipNb] = useState("");
  const [bornAt, setBornAt] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [specie, setSpecie] = useState<Specie | "">("");
  const [breed, setBreed] = useState("");
  const [isNeutered, setIsNeutered] = useState(false);
  const [weight, setWeight] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmited, setIsSubmited] = useState(false);

  const navigate = useNavigate();

  const createPet = async (pet: CreatePet) => {
    setIsSubmited(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(pet),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du rappel");
      }

      const data = await response.json();

      navigate(`/pet-profile/${data.newPetId}`, {
        state: { successMessage: "Rappel créé avec succès !" },
      });
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création du rappel",
      );
    } finally {
      setIsSubmited(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <header className={styles.petVet}>
        <img
          src={"/images/green/logo.png"}
          alt="logo-petvet"
          className={styles.logoPet}
        />
        <h1>Pet&Vet</h1>
      </header>
      <main className={styles.petFormPage}>
        <div className={styles.mainPage}>
          <NavBar />
          <div className={styles.petFormContainer}>
            <h1 className={styles.petFormTitle}>Ajouter un animal</h1>
            <article className={styles.background}>
              <form
                className={styles.petForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!gender || !specie) {
                    setErrorMessage(
                      "Veuillez sélectionner le sexe et l'espèce",
                    );
                    return;
                  }
                  createPet({
                    name,
                    tattoo_nb: tattooNb || null,
                    chip_nb: chipNb ? Number(chipNb) : null,
                    born_at: bornAt,
                    gender: gender as Gender,
                    specie: specie as Specie,
                    breed,
                    is_neutered: isNeutered,
                    weight: weight ? Number(weight) : null,
                  });
                }}
              >
                <p className={styles.error}>{errorMessage}</p>
                <label className={styles.petLabelName}>
                  {"Nom"}
                  <span className={styles.obligatory}>* :</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Nom"
                    className={styles.petNameInput}
                  />
                </label>
                <label className={styles.petLabelTattoo}>
                  {"Numéro de tatouage :"}
                  <input
                    type="number"
                    value={tattooNb}
                    onChange={(e) => setTattooNb(e.target.value)}
                    placeholder="Numéro de tatouage"
                    className={styles.tattooPetInput}
                  />
                </label>

                <label className={styles.petLabelChip}>
                  {"Numéro de puce :"}
                  <input
                    type="number"
                    value={chipNb}
                    onChange={(e) => setChipNb(e.target.value)}
                    placeholder="Numéro de puce"
                    className={styles.chipNbPetInput}
                  />
                </label>

                <label className={styles.petLabelBorn}>
                  {"Date de naissance"}
                  <span className={styles.obligatory}>* :</span>
                  <input
                    type="date"
                    name="Date-de-naissance"
                    max={today}
                    value={bornAt}
                    onChange={(e) => setBornAt(e.target.value)}
                    required
                    className={styles.bornAtPetInput}
                  />
                </label>

                <label className={styles.petLabelGender}>
                  {"Sexe"}
                  <span className={styles.obligatory}>* :</span>
                  <select
                    className="sexeValue"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                  >
                    <option value="" disabled>
                      Sélectionnez le sexe :
                    </option>
                    <option value="f">Femelle</option>
                    <option value="m">Mâle</option>
                  </select>
                </label>

                <label className={styles.petLabelSpecie}>
                  {"Espece"}
                  <span className={styles.obligatory}>* :</span>
                  <select
                    value={specie}
                    onChange={(e) => setSpecie(e.target.value as Specie)}
                  >
                    <option value="" disabled>
                      Sélectionnez l'espèce de votre animal
                    </option>

                    <option value="Chien">Chien</option>

                    <option value="Chat">Chat</option>

                    <option value="Lapin">Lapin</option>
                  </select>
                </label>

                <label className={styles.petLabelBreed}>
                  {"Race"}
                  <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    required
                    placeholder="Race"
                    className={styles.breedPetInput}
                  />
                </label>

                <div className={styles.toggleNeutered}>
                  <input
                    type="checkbox"
                    id="modeSwitchNeutered"
                    className={styles.checkbox}
                    checked={isNeutered}
                    onChange={() => setIsNeutered(!isNeutered)}
                  />
                  Stérilisé :
                  <label
                    htmlFor="modeSwitchNeutered"
                    className={styles.toggleLabel}
                  >
                    <span
                      className={`${styles.labelText} ${!isNeutered ? styles.active : " "}`}
                    >
                      Non
                    </span>
                    <span
                      className={`${styles.labelText} ${isNeutered ? styles.active : " "}`}
                    >
                      Oui
                    </span>
                    <div className={styles.switchSlider} />
                  </label>
                </div>

                <label className={styles.petLabelWeight}>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    placeholder="Poids"
                    className={styles.weightPetInput}
                  />
                  <span>Kg</span>
                </label>

                {/* <label className={styles.photoLabel}>
              Photo
              <span className={styles.obligatory}>*</span>
              <input
                type="file"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                required
                className={styles.photoPetInput}
              />
            </label>

            <div className={styles.FormPhotoContainer}>
              <img src={photo} alt={name} />
            </div> */}
                <div className={styles.petLabelSubmit}>
                  <button type="submit" disabled={isSubmited}>
                    {isSubmited ? "Création..." : "Enregistrer"}
                  </button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default PetForm;
