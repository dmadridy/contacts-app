import { createBrowserRouter, Outlet } from "react-router-dom";
import BaseLayout from "@/layouts/base-layout";
import PageLayout from "./layouts/page-layout";
import Dashboard from "./pages/dashboard";

const router = createBrowserRouter([
  {
    element: (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
    children: [
      {
        path: "/",
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
]);

export default router;
