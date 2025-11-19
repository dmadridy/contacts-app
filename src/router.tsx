import {
  createBrowserRouter,
  Outlet,
  type RouteObject,
} from "react-router-dom";
import BaseLayout from "@/layouts/base-layout";
import PageLayout from "@/layouts/page-layout";
import Dashboard from "@/pages/dashboard";
import Basic from "@/pages/create-contact/basic";
import Contact from "@/pages/create-contact/contact";
import Summary from "@/pages/create-contact/summary";

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
    ],
  },
];

const noLayoutRoutes: RouteObject[] = [
  {
    path: "/create-contact",
    children: [
      {
        index: true,
        element: <Basic />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "summary",
        element: <Summary />,
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    children: [...baseLayoutRoutes, ...noLayoutRoutes],
  },
]);

export default router;
