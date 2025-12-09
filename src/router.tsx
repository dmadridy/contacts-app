import {
  createBrowserRouter,
  Outlet,
  type RouteObject,
} from "react-router-dom";

import Contacts from "@/pages/contacts";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import BaseLayout from "@/components/layouts/base-layout";
import PageLayout from "@/components/layouts/page-layout";
import Contact from "./pages/contact";
import BasicStep from "./pages/create-contact/basic-step";
import ContactStep from "./pages/create-contact/contact-step";
import SummaryStep from "./pages/create-contact/summary-step";
import Settings from "./pages/settings";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up.tsx";

const baseLayoutRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
    children: [
      {
        index: true,
        element: (
          <PageLayout
            title="Dashboard"
            description="This is the dashboard page."
          >
            <Dashboard />
          </PageLayout>
        ),
      },
      {
        path: "contacts",
        element: (
          <PageLayout title="Contacts" description="This is the contacts page.">
            <Contacts />
          </PageLayout>
        ),
      },
      {
        path: "contact/:id",
        element: (
          <PageLayout title="Contact" description="This is the contact page.">
            <Contact />
          </PageLayout>
        ),
      },
      {
        path: "settings",
        element: (
          <PageLayout title="Settings" description="This is the settings page.">
            <Settings />
          </PageLayout>
        ),
      },
    ],
  },
];

const noLayoutRoutes: RouteObject[] = [
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/create-contact",
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
];

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [...baseLayoutRoutes, ...noLayoutRoutes],
  },
]);

export default router;
