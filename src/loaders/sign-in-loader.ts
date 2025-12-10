import { auth } from "@/main";
import type { FirebaseError } from "firebase/app";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { toast } from "sonner";

export async function signInLoader({
  request,
}: LoaderFunctionArgs): Promise<Response | null> {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  if (!email) return null;

  try {
    if (isSignInWithEmailLink(auth, url.href)) {
      await signInWithEmailLink(auth, email, url.href);
      return redirect("/");
    }
  } catch (error) {
    toast.error((error as FirebaseError).message);
  }

  return null;
}
