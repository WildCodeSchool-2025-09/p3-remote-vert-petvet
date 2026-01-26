import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import "../assets/styles/consultForm.css";

type Category = "vaccination" | "urgence" | "suivi" | "operation" | "medicale";

interface CreateConsult {
  title: string;
  createdAt: string;
  report: string;
  dosage: string | null;
  category: Category | null;
  treatment: string | null;
  petId: number;
  veterinaryId: number;
}

type Animal = {
  id: number;
  name: string;
};

function ConsultForm() {
  const [title, setTitle] = useState("");
  const [createdAt, setcreatedAt] = useState("");
  const [report, setReport] = useState("");
  const [dosage, setDosage] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [treatment, setTreatment] = useState<string | "">("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const { id } = useParams<{ id: string }>();
  const vetId = Number(id);

  const navigate = useNavigate();

  useEffect(() => {
    if (!vetId) return;

    fetch(`${import.meta.env.VITE_API_URL}/consult/pet/${vetId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);

        if (Array.isArray(data)) {
          setAnimals(data);
        } else if (data?.id && data?.name) {
          setAnimals([data]);
        } else {
          console.error("Format inattendu:", data);
          setAnimals([]);
        }
      })
      .catch((err) => console.error(err));
  }, [vetId]);

  const createConsult = async (consult: CreateConsult) => {
    if (!selectedAnimal) {
      setErrorMessage("Veuillez sélectionner un animal");
      return;
    }
    if (!category) {
      setErrorMessage("Veuillez sélectionner une categorie");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/consult/${selectedAnimal}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(consult),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la consultation");
      }

      setSuccessMessage("Consultation créé avec succès !");

      setTimeout(() => {
        navigate("/");
      }, 2000);
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

  const submitConsult = (e: React.FormEvent) => {
    e.preventDefault();

    const newConsult = {
      title: title,
      createdAt: createdAt,
      report: report,
      dosage: dosage || null,
      category: category || null,
      treatment: treatment || null,
      petId: selectedAnimal ?? 0,
      veterinaryId: vetId,
    };

    createConsult(newConsult);
  };

  return (
    <section>
      <header className="pet-vet">Pet&Vet</header>
      <h1 className="Consult-form-title">Ajouter une consultation</h1>
      <article className="form-container">
        <form onSubmit={submitConsult}>
          <p className="error">{errorMessage}</p>
          <p className="success">{successMessage}</p>
          <div className="category-value">
            <select
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
          <div className="date">
            <label>
              Date programmée <span className="obligatory">*</span>
              <input
                type="datetime-local"
                value={createdAt}
                onChange={(e) => setcreatedAt(e.target.value)}
                required
                className="date"
              />
            </label>
          </div>
          <div className="animal-name">
            <select
              value={selectedAnimal ?? ""}
              onChange={(e) => setSelectedAnimal(Number(e.target.value))}
            >
              <option value="" disabled hidden>
                Sélectionne un animal
              </option>
              {animals.map((animal) => (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              ))}
            </select>
          </div>
          <div className="title">
            <label>
              Titre <span className="obligatory">*</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="title-input"
              />
            </label>
          </div>
          <div className="content">
            <label>
              <textarea
                placeholder="Détails de la consultation :"
                value={report}
                onChange={(e) => setReport(e.target.value)}
                required
                className="content"
              />
            </label>
          </div>
          <div className="treatment">
            <label>
              Traitement
              <input
                type="text"
                value={treatment}
                placeholder="traitement"
                onChange={(e) => setTreatment(String(e.target.value))}
                className="treatment-input"
              />
            </label>
          </div>
          <div className="dosage">
            <label>
              Posologie
              <input
                type="text"
                value={dosage}
                placeholder="posologie"
                onChange={(e) => setDosage(e.target.value)}
                className="dosage-input"
              />
            </label>
          </div>
          <div className="button-container">
            <p className="obligatory">* Champs obligatoires</p>
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

export default ConsultForm;
