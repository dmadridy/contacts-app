import { createBrowserRouter, type RouteObject } from "react-router-dom";

import Contacts from "@/pages/contacts";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import AuthLayout from "@/components/layouts/auth-layout.tsx";
import AuthRouteGuardian from "./components/layouts/auth-route-guardian.tsx";
import GuestRouteGuardian from "./components/layouts/guest-route-guardian.tsx";
import PageLayout from "./components/layouts/page-layout.tsx";
import { signInLoader } from "./loaders/sign-in-loader.ts";
import Contact from "./pages/contact";
import BasicStep from "./pages/create-contact/basic-step";
import ContactStep from "./pages/create-contact/contact-step";
import SummaryStep from "./pages/create-contact/summary-step";
import Settings from "./pages/settings";
import SignIn from "./pages/sign-in/index.tsx";
import SignUp from "./pages/sign-up.tsx";

const authRoutes: RouteObject[] = [
  {
    element: <AuthRouteGuardian />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout>
            <PageLayout />
          </AuthLayout>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "contacts",
            element: <Contacts />,
          },
          {
            path: "contact/:id",
            element: <Contact />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "create-contact",
        children: [
          {
            index: true,
            element: <BasicStep />,
          },
          {
            path: "contact",
            element: <ContactStep />,
          },
          {
            path: "summary",
            element: <SummaryStep />,
          },
        ],
      },
    ],
  },
];

const noAuthRoutes: RouteObject[] = [
  {
    element: <GuestRouteGuardian />,
    children: [
      {
        path: "/sign-in",
        loader: signInLoader,
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [...authRoutes, ...noAuthRoutes],
  },
]);

export default router;
