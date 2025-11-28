import { useEffect, useState } from "react";
import { db } from "@/main";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import type { Contact } from "@/lib/types";
import { formatPhoneNumber } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditContactDialog from "./components/edit-contact-dialog";

export default function Contact() {
  const { id } = useParams();
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (!id) return;
    try {
      const fetchContact = async () => {
        const contact = await getDoc(doc(db, "contacts", id));
        setContact(contact.data() as Contact);
      };
      fetchContact();
    } catch {
      toast.error("Error fetching contact");
    }
  }, [id]);

  return (
    <div>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            {contact?.firstName} {contact?.lastName}
          </CardTitle>
          <EditContactDialog contact={contact} />
        </CardHeader>
        <CardContent>
          <p>{contact?.email}</p>
          <p>{contact?.phone ? formatPhoneNumber(contact.phone) : ""}</p>
        </CardContent>
      </Card>
    </div>
  );
}
