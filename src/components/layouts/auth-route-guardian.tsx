import { useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

import { userStore } from "@/lib/store/user";
import LoadingScreen from "./loading-screen";

export default function AuthRouteGuardian() {
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  onAuthStateChanged(auth, (user) => {
    setAuthState(user ? "authenticated" : "unauthenticated");
    if (user) {
      userStore.setState({ user });
    }
  });

  return authState === "loading" ? (
    <LoadingScreen />
  ) : authState === "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
