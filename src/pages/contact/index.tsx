import { useEffect, useState } from "react";
import type { FirebaseError } from "firebase/app";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import type { Contact } from "@/index";
import { db } from "@/lib/firebase";
import { useUserStore } from "@/lib/store/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Phone from "@/components/phone";
import EditContactDialog from "./components/edit-contact-dialog";
import Keywords from "./components/keywords";

export default function Contact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (!id || !user?.uid) return;

    const userDocRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      doc(userDocRef, "contacts", id),
      (docSnapshot) => {
        setContact(docSnapshot.data() as Contact);
      },
      (error) => {
        toast.error((error as FirebaseError).message);
        navigate("/contacts");
      },
    );

    return () => {
      unsubscribe();
    };
  }, [id, navigate, user?.uid]);

  return (
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
  );
}
