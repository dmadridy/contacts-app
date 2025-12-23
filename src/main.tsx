import { StrictMode } from "react";
import router from "@/router";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster closeButton richColors position="top-right" />
    <RouterProvider router={router} />
  </StrictMode>,
);
