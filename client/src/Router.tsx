import { createBrowserRouter } from "react-router";
import App from "./App";
import ConsultForm from "./pages/ConsultForm";
import HealthRecord from "./pages/HealthRecord";
import ReminderForm from "./pages/ReminderForm";
import Reminders from "./pages/Reminders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    element: <ConsultForm />,
  },
]);

export default router;
