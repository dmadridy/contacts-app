import { db } from "@/main";
import type { FirebaseError } from "firebase/app";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useCreateContactStore } from "@/lib/store/create-contact";
import { formatPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Keywords from "../contact/components/keywords";
import Navigation from "./components/navigation";

export default function Summary() {
  const navigate = useNavigate();
  const data = useCreateContactStore((state) => state.data);
  const reset = useCreateContactStore((state) => state.reset);

  async function addContact() {
    try {
      await addDoc(collection(db, "contacts"), {
        ...data.basicInfo,
        ...data.contactInfo,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast.success("Contact created successfully");
    } catch (error) {
      toast.error((error as FirebaseError).message);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 place-content-center">
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="p-0">
            <div className="p-4">
              <p>
                Name: {data.basicInfo.firstName} {data.basicInfo.lastName}
              </p>
              <p>Email: {data.contactInfo.email}</p>
              <p>Phone: {formatPhoneNumber(data.contactInfo.phone)}</p>
            </div>
            <Separator className="my-4" />
            <div className="p-4">
              <Keywords keywords={data.basicInfo.keywords} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Navigation>
        <Button
          variant="outline"
          onClick={() => navigate("/create-contact/contact")}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            addContact();
            navigate("/contacts");
            reset();
          }}
        >
          Create Contact
        </Button>
      </Navigation>
    </div>
  );
}
