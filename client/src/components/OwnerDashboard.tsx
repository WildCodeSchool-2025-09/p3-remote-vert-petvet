import type { Activity } from "../types/Activity";
import type { Pet } from "../types/Pet";

interface OwnerDashboard {
  dashboard: {
    pets: Pet[];
    activities: Activity[];
  };
}

function OwnerDashboard({ dashboard }: OwnerDashboard) {
  return (
    <>
      <section>
        <h2>Mes compagnons</h2>
        {dashboard.pets.length === 0 && (
          <p>Vous n'avez aucun animal, veuillez en ajouter.</p>
        )}
        {dashboard.pets.slice(0, 4).map((pet) => (
          <article key={pet.id}>
            <img src={pet.photo} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p>{pet.specie}</p>
            <p>{pet.breed}</p>
            <p>{pet.gender === "m" ? "♂" : "♀"}</p>
          </article>
        ))}
        <button type="button">Voir plus</button>
      </section>
      <section>
        <h2>Activités et événements</h2>
        {dashboard.activities.length === 0 && <p>Aucun événement récent.</p>}
        {dashboard.activities.map((activity: Activity) => (
          <article key={activity.id}>
            <img
              src={
                activity.type === "consultation"
                  ? "/images/green/stetoscope.png"
                  : "images/green/calendar.png"
              }
              alt={activity.type}
            />
            <h3>{activity.title}</h3>
            <p>{activity.petName}</p>
            <p>{new Date(activity.date).toLocaleDateString()}</p>
          </article>
        ))}
      </section>
      <section>
        <h2>Le saviez-vous ?</h2>
        <article>
          <img src="/images/green/emergency.png" alt="Urgence logo" />
          <h3>Médicaments dangereux</h3>
          <p>
            L'aspirine et le paracétamol sont toxiques pour les animaux. Il est
            rudement conseillé de ne jamais faire d'auto-médication. Consultez
            votre vétérinaire avant de donner tout traitement à votre animal.
          </p>
        </article>
        <article>
          <img src="/images/green/emergency.png" alt="Urgence logo" />
          <h3>Signes d'urgence</h3>
          <p>
            Contactez immédiatement un vétérinaire si votre animal : ne mange
            plus depuis 24h, à des selles noires, ne peux plus uriner... Si
            votre lapin mange moins que d'habitude ou refuse catégoriquement de
            manger, il s'agit d'une urgence.
          </p>
        </article>
      </section>

      <section>
        <h2>
          ATTENTION ! L'utilisation de ce site ne remplace pas l'avis d'un
          vétérinaire !
        </h2>
      </section>
    </>
  );
}

export default OwnerDashboard;
