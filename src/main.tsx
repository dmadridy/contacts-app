import { StrictMode } from "react";
import router from "@/router";
import { LDProvider } from "launchdarkly-react-client-sdk";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LDProvider clientSideID={import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID}>
      <Toaster closeButton richColors position="top-right" />
      <RouterProvider router={router} />
    </LDProvider>
  </StrictMode>,
);
