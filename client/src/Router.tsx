import { createBrowserRouter } from "react-router";
import App from "./App";
import HealthRecord from "./pages/HealthRecord";
import MyPetsList from "./pages/MyPetsList";
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
]);

export default router;
