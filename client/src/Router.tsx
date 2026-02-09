import { createBrowserRouter } from "react-router";
import App from "./App";
import ProtectedRoute from "./ProtectedRoute";
import ConsultationForm from "./pages/ConsultationForm";
import HealthRecord from "./pages/HealthRecord";
import Login from "./pages/Login";
import MyPetsList from "./pages/MyPetsList";
import Register from "./pages/Register";
import ReminderForm from "./pages/ReminderForm";
import Reminders from "./pages/Reminders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/my-pets",
    element: (
      <ProtectedRoute allowedRoles={["owner"]}>
        <MyPetsList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reminders",
    element: (
      <ProtectedRoute allowedRoles={["owner", "veterinary"]}>
        <Reminders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pet-profile/:id",
    element: (
      <ProtectedRoute allowedRoles={["owner", "veterinary"]}>
        <HealthRecord />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pet-profile/:id/reminders/new",
    element: (
      <ProtectedRoute allowedRoles={["owner", "veterinary"]}>
        <ReminderForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/consultation/add/:id",
    element: (
      <ProtectedRoute allowedRoles={["veterinary"]}>
        <ConsultationForm />
      </ProtectedRoute>
    ),
  },
]);

export default router;
