import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/use-auth";
import LoadingScreen from "./loading-screen";

export default function GuestRouteGuardian() {
  const authState = useAuth();

  return authState === "loading" ? (
    <LoadingScreen />
  ) : authState === "unauthenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
