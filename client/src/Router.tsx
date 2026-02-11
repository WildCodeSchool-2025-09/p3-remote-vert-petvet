import { createBrowserRouter } from "react-router";
import App from "./App";
import ConsultationForm from "./pages/ConsultationForm";
import HealthRecord from "./pages/HealthRecord";
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
    path: "/my-pets/:id/",
    element: <MyPetsList />,
  },
  {
    path: "/reminders",
    element: <Reminders />,
  },
  {
    path: "/pet-profile/:id",
    element: <HealthRecord />,
  },
  {
    path: "/pet-profile/:id/reminders/new",
    element: <ReminderForm />,
  },
  {
    path: "/consultation/add/:id",
    element: <ConsultationForm />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
