import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { auth } from "@/lib/firebase";
import { useUserStore } from "@/lib/store/user";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate("/sign-in");
    } catch (error) {
      toast.error((error as FirebaseError).message || "Error signing out");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">{user?.displayName}</p>
        <p className="text-muted-foreground">{user?.email}</p>
      </div>
      <div>
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>
    </div>
  );
}
