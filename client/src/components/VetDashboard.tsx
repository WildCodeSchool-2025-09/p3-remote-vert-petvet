import type { Patient } from "../types/Pet";

interface VetDashboard {
  dashboard: {
    patients: Patient[];
  };
}

function VetDashboard({ dashboard }: VetDashboard) {
  return (
    <section>
      <h2>Mes patients</h2>
      {dashboard.patients.length === 0 && (
        <p>Vous n'avez aucun patient suivi, veuillez en ajouter.</p>
      )}
      {dashboard.patients.slice(0, 4).map((patient) => (
        <article key={patient.id}>
          <img src={patient.photo} alt={patient.name} />
          <h3>{patient.name}</h3>
          <p>
            {patient.ownerLastname} {patient.ownerFirstname}
          </p>
          <p>{patient.specie}</p>
          <p>{patient.breed}</p>
          <p>{patient.gender === "m" ? "♂" : "♀"}</p>
        </article>
      ))}
    </section>
  );
}

export default VetDashboard;
