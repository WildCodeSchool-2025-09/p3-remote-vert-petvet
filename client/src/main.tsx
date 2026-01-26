import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import MyPetsList from "./pages/MyPetsList";
import ReminderForm from "./pages/ReminderForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/reminder/add",
    element: <ReminderForm />,
  },
  {
    path: "/my-pets/:id/",
    element: <MyPetsList />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(<RouterProvider router={router} />);
