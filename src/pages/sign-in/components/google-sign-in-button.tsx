import { useCallback, useEffect, useRef } from "react";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { toast } from "sonner";

import { auth } from "@/lib/firebase";
import { createOrUpdateUserDocument } from "@/lib/utils";

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

        const userCredential = await signInWithCredential(
          auth,
          googleCredential,
        );
        await createOrUpdateUserDocument(userCredential.user);
      } catch {
        toast.error("Error signing in with Google");
      }
    },
    [],
  );

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (!window.google) {
        return false;
      }

      try {
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
        return true;
      } catch (error) {
        console.error("Error initializing Google Sign-In:", error);
        return false;
      }
    };

    // Try to initialize immediately
    if (initializeGoogleSignIn()) {
      return;
    }

    // If not available, set up retry mechanism
    const maxRetries = 50; // Check for up to ~25 seconds (50 * 500ms)
    let retryCount = 0;
    const retryInterval = setInterval(() => {
      retryCount++;

      if (initializeGoogleSignIn()) {
        clearInterval(retryInterval);
        return;
      }

      if (retryCount >= maxRetries) {
        clearInterval(retryInterval);
        toast.error("Google Sign-In failed to load. Please refresh the page.");
      }
    }, 500); // Check every 500ms

    // Cleanup interval on unmount
    return () => {
      clearInterval(retryInterval);
    };
  }, [handleCredentialResponse]);

  return <div ref={buttonDivRef}></div>;
}
