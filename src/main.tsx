import { createRoot } from "react-dom/client";
import "./index.css"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";

import DefaultLayout from "./views/_layout.tsx";
import HomePageRoute from "./views/homePage.tsx";
import CreateListRoute from "./views/bringliste.tsx";
import DetailViewRoute from "./views/listViewForm-2.tsx";
//import ListViewRouteForm from './views/listViewForm.tsx'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <HomePageRoute /> },
      { path: "/create", element: <CreateListRoute /> },
      { path: "/liste/:id", element: <DetailViewRoute /> }, // Mitbringsel detay ve düzenleme
    ],
  },
]);

// React uygulamasını başlatma
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
