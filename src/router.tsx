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
import Step1 from "./pages/create-contact/step-1";
import Step2 from "./pages/create-contact/step-2";
import Step3 from "./pages/create-contact/step-3";

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
    ],
  },
];

const noLayoutRoutes: RouteObject[] = [
  {
    path: "/create-contact",
    children: [
      {
        index: true,
        element: <Step1 />,
      },
      {
        path: "contact",
        element: <Step2 />,
      },
      {
        path: "summary",
        element: <Step3 />,
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
