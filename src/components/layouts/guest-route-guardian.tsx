import { useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

import { userStore } from "@/lib/store/user";
import LoadingScreen from "./loading-screen";

export default function GuestRouteGuardian({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <Navigate to="/" />
  ) : (
    children
  );
}
