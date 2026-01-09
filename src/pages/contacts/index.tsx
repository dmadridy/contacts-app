import { useEffect, useState } from "react";
import type { FirebaseError } from "firebase/app";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import type { Contact } from "@/index";
import { db } from "@/lib/firebase";
import { useUserStore } from "@/lib/store/user";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function Contacts() {
  const user = useUserStore((state) => state.user);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    const userDocRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      collection(userDocRef, "contacts"),
      (snapshot) => {
        setContacts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Contact[],
        );
      },
      (error) => {
        toast.error((error as FirebaseError).message);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  return (
    <div className="flex flex-col gap-4">
      <Button asChild className="self-end">
        <Link to="/create-contact">Create Contact</Link>
      </Button>
      <DataTable columns={columns} data={contacts} />
    </div>
  );
}
