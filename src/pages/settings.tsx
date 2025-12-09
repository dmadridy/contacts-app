import { auth } from "@/main";
import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function Settings() {
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate("/sign-in");
    } catch (error) {
      toast.error((error as FirebaseError).message || "Error signing out");
    }
  }

  return <Button onClick={handleSignOut}>Sign out</Button>;
}
