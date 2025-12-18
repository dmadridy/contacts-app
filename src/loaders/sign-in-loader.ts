import { logEvent } from "firebase/analytics";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { replace, type LoaderFunctionArgs } from "react-router-dom";
import { toast } from "sonner";

import { analytics, auth } from "@/lib/firebase";

export async function signInLoader({
  request,
}: LoaderFunctionArgs): Promise<Response | null> {
  const url = new URL(request.url);
  const fullUrl = url.href;
  const email = url.searchParams.get("email");

  if (!email) {
    localStorage.setItem("pendingEmailLink", fullUrl);
    return null;
  }

  try {
    const isEmailLink = isSignInWithEmailLink(auth, fullUrl);

    if (isEmailLink) {
      await signInWithEmailLink(auth, email, fullUrl);
      logEvent(analytics, "sign_in_with_email_link");
      localStorage.removeItem("pendingEmailLink");
      return replace("/");
    }

    return null;
  } catch {
    toast.error("Error signing in with email link");
    return null;
  }
}
