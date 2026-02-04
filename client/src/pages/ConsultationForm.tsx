import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import "../assets/styles/consultationForm.css";
import type { Category, CreateConsultation } from "../types/Consultation";
import type { Pet } from "../types/Pet";

function consultationForm() {
  const [title, setTitle] = useState("");
  const [createdAt, setcreatedAt] = useState("");
  const [report, setReport] = useState("");
  const [dosage, setDosage] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [treatment, setTreatment] = useState<string | "">("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [pets, setpets] = useState<Pet[]>([]);
  const { id } = useParams<{ id: string }>();
  const vetId = Number(id);

  const navigate = useNavigate();

  useEffect(() => {
    if (!vetId) return;

    fetch(`${import.meta.env.VITE_API_URL}/consultations/pets/${vetId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setpets(data);
        } else if (data?.id && data?.name) {
          setpets([data]);
        } else {
          console.error("Format inattendu:", data);
          setpets([]);
        }
      })
      .catch((err) => console.error(err));
  }, [vetId]);

  const createConsultation = async (consultation: CreateConsultation) => {
    if (!selectedPet) {
      setErrorMessage("Veuillez sélectionner un pet");
      return;
    }
    if (!category) {
      setErrorMessage("Veuillez sélectionner une categorie");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/consultations/${selectedPet}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(consultation),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la consultation");
      }

      setTimeout(() => {
        navigate(`/pet-profile/${selectedPet}`, {
          state: { successMessage: "Consultation créée avec succès !" },
        });
      });
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création de la consultation",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <header className="pet-vet-consultation">Pet&Vet</header>
      <h1 className="consultation-form-title">Ajouter une consultation</h1>
      <article className="consultation-form-container">
        <form
          className="consultation-form"
          onSubmit={(e) => {
            e.preventDefault();
            createConsultation({
              title,
              createdAt,
              report,
              dosage: dosage || null,
              category: category || null,
              treatment: treatment || null,
              petId: selectedPet ?? 0,
            });
          }}
        >
          <p className="consultation-error">{errorMessage}</p>
          <div className="consultation-category-value">
            <select
              className="consultation-select"
              value={category}
              aria-placeholder="category"
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="" disabled hidden>
                Select a category
              </option>
              <option value="vaccination">vaccination</option>
              <option value="urgence">urgence</option>
              <option value="suivi">suivi</option>
              <option value="operation">opération</option>
              <option value="medicale">médicale</option>
            </select>
          </div>
          <div className="consultation-date">
            <label>
              Date programmée <span className="consultation-obligatory">*</span>
              <input
                type="datetime-local"
                value={createdAt}
                onChange={(e) => setcreatedAt(e.target.value)}
                required
                className="date"
              />
            </label>
          </div>
          <div className="consultation-pet-name">
            <select
              className="consultation-select"
              value={selectedPet ?? ""}
              onChange={(e) => setSelectedPet(Number(e.target.value))}
            >
              <option value="" disabled hidden>
                Sélectionne un pet
              </option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
          </div>
          <div className="consultation-title">
            <label>
              Titre <span className="consultation-obligatory">*</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="consultation-title-input"
              />
            </label>
          </div>
          <div className="consultation-content">
            <label>
              <textarea
                placeholder="Détails de la consultation :"
                value={report}
                onChange={(e) => setReport(e.target.value)}
                required
                className="consultation-content"
              />
            </label>
          </div>
          <div className="consultation-treatment">
            <label>
              Traitement
              <input
                type="text"
                value={treatment}
                placeholder="traitement"
                onChange={(e) => setTreatment(String(e.target.value))}
                className="consultation-treatment-input"
              />
            </label>
          </div>
          <div className="consultation-dosage">
            <label>
              Posologie
              <input
                type="text"
                value={dosage}
                placeholder="posologie"
                onChange={(e) => setDosage(e.target.value)}
                className="consultation-dosage-input"
              />
            </label>
          </div>
          <div className="consultation-button-container">
            <p className="consultation-obligatory">* Champs obligatoires</p>
            <button
              type="submit"
              className="send-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Création..." : "Créer une consultation"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default consultationForm;
