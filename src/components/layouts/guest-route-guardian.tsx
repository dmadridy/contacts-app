import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

import { auth } from "@/lib/firebase";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState(user ? "authenticated" : "unauthenticated");
      userStore.setState({ user });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return authState === "loading" ? (
    <LoadingScreen />
  ) : authState === "authenticated" ? (
    <Navigate to="/" />
  ) : (
    children
  );
}
