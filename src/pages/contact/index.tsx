import { useEffect, useState } from "react";
import { db } from "@/main";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import type { Contact } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Phone from "@/components/phone";
import EditContactDialog from "./components/edit-contact-dialog";
import Keywords from "./components/keywords";

export default function Contact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(
      doc(db, "contacts", id),
      (docSnapshot) => {
        setContact(docSnapshot.data() as Contact);
      },
      () => {
        toast.error("Error fetching contact");
        navigate("/contacts");
      },
    );

    return () => unsubscribe();
  }, [id, navigate]);

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
          <Phone phone={contact?.phone} />
          <Separator className="my-4" />
          <Keywords keywords={contact?.keywords} />
        </CardContent>
      </Card>
    </div>
  );
}
