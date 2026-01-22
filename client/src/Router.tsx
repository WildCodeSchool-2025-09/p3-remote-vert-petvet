import { createBrowserRouter } from "react-router";
import App from "./App";
import HealthRecord from "./pages/HealthRecord";
import Reminders from "./pages/Reminders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/reminder",
    element: <Reminders />,
  },
  {
    path: "/pet-profile/:id",
    element: <HealthRecord />,
  },
]);

export default router;
