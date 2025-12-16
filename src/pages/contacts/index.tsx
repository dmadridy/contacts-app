import { useEffect, useState } from "react";
import type { FirebaseError } from "firebase/app";
import { collection, doc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { db } from "@/lib/firebase";
import { useUserStore } from "@/lib/store/user";
import type { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function Contacts() {
  const user = useUserStore((state) => state.user);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchContacts = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const contacts = await getDocs(collection(userDocRef, "contacts"));
        setContacts(
          contacts.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Contact[],
        );
      } catch (error) {
        toast.error((error as FirebaseError).message);
      }
    };
    fetchContacts();
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
