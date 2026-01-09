import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/use-auth";
import LoadingScreen from "./loading-screen";

export default function AuthRouteGuardian() {
  const authState = useAuth();

  return authState === "loading" ? (
    <LoadingScreen />
  ) : authState === "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
