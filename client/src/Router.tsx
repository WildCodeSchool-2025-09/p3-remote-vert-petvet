import { createBrowserRouter } from "react-router";
import App from "./App";
import HealthRecord from "./pages/HealthRecord";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pet-profile/:id",
    element: <HealthRecord />,
  },
]);
export default router;
