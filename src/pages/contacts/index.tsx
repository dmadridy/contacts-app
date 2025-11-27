import { useEffect, useState } from "react";
import { db } from "@/main";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import type { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    try {
      const fetchContacts = async () => {
        const contacts = await getDocs(collection(db, "contacts"));
        setContacts(
          contacts.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Contact[],
        );
      };
      fetchContacts();
    } catch {
      toast.error("Error fetching contacts");
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Button asChild className="self-end">
        <Link to="/create-contact">Create Contact</Link>
      </Button>
      <DataTable columns={columns} data={contacts} />
    </div>
  );
}
