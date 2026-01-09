import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useUserStore } from "@/lib/store/user";

export default function useAuth() {
  const setUser = useUserStore((state) => state.setUser);
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState(user ? "authenticated" : "unauthenticated");
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [setUser]);

  return authState;
}
