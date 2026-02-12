import { useEffect, useState } from "react";
import OwnerDashboard from "../components/OwnerDashboard";
import VetDashboard from "../components/VetDashboard";
import { useAuth } from "../context/AuthContext";
import type { Activity } from "../types/Activity";
import type { Patient, Pet } from "../types/Pet";

type OwnerDashboardData = {
  pets: Pet[];
  activities: Activity[];
};

type VetDashboardData = {
  patients: Patient[];
};

function Dashboard() {
  const auth = useAuth();
  const [dashboardInfos, setDashboardInfos] = useState<
    OwnerDashboardData | VetDashboardData | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchByRole = auth?.isVet
      ? "/veterinaries/me/dashboard"
      : "/owners/me/dashboard";

    fetch(`${import.meta.env.VITE_API_URL}${fetchByRole}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((dashboardData) => {
        setDashboardInfos(dashboardData);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger votre tableau de bord.");
        setIsLoading(false);
      });
  }, [auth]);

  if (isLoading) return <p>Chargement du tableau de bord...</p>;
  if (!auth?.user) return <p>Chargement de l'utilisateur...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>
        Bonjour {auth?.isVet ? `Dr ${auth.user.lastname}` : auth.user.firstname}
      </h1>
      {auth?.isOwner && (
        <OwnerDashboard dashboard={dashboardInfos as OwnerDashboardData} />
      )}
      {auth?.isVet && (
        <VetDashboard dashboard={dashboardInfos as VetDashboardData} />
      )}
    </>
  );
}

export default Dashboard;
