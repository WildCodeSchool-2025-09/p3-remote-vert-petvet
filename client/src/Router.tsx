import { createBrowserRouter } from "react-router";
import App from "./App";
import AuthContext from "./context/AuthContext";
import ConsultationForm from "./pages/ConsultationForm";
import HealthRecord from "./pages/HealthRecord";
import Login from "./pages/Login";
import MyPetsList from "./pages/MyPetsList";
import ReminderForm from "./pages/ReminderForm";
import Reminders from "./pages/Reminders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/my-pets/:id/",
    element: (
      <AuthContext>
        <MyPetsList />
      </AuthContext>
    ),
  },
  {
    path: "/reminders",
    element: (
      <AuthContext>
        <Reminders />,
      </AuthContext>
    ),
  },
  {
    path: "/pet-profile/:id",

    element: (
      <AuthContext>
        <HealthRecord />,
      </AuthContext>
    ),
  },
  {
    path: "/pet-profile/:id/reminders/new",

    element: (
      <AuthContext>
        <ReminderForm />,
      </AuthContext>
    ),
  },
  {
    path: "/consultation/add/:id",
    element: (
      <AuthContext>
        <ConsultationForm />,
      </AuthContext>
    ),
  },
]);

export default router;
