import { useCallback, useEffect, useRef } from "react";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { toast } from "sonner";

import { auth } from "@/lib/firebase";

interface CredentialResponse {
  credential: string;
  select_by: string;
}

export default function GoogleSignInButton() {
  const buttonDivRef = useRef<HTMLDivElement>(null);

  const GOOGLE_CLIENT_ID =
    "272636938220-l1q3j5svpput7ueoquc8en33ldklnp24.apps.googleusercontent.com";

  const handleCredentialResponse = useCallback(
    async (response: CredentialResponse) => {
      try {
        const googleCredential = GoogleAuthProvider.credential(
          response.credential,
        );

        await signInWithCredential(auth, googleCredential);
      } catch {
        toast.error("Error signing in with Google");
      }
    },
    [],
  );

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(buttonDivRef.current, {
        size: "large",
        text: "continue_with",
        shape: "rectangular",
      });

      window.google.accounts.id.prompt();
    } else {
      toast.warning("Google Identity Services script not loaded yet.");
    }
  }, [handleCredentialResponse]);

  return <div ref={buttonDivRef}></div>;
}
