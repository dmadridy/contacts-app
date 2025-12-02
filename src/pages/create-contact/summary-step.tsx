import { db } from "@/main";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useCreateContactStore } from "@/lib/store/create-contact";
import { formatPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FieldsWrapper from "./components/fields-wrapper";
import Navigation from "./components/navigation";

export default function Summary() {
  const data = useCreateContactStore((state) => state.data);
  const navigate = useNavigate();

  async function addContact() {
    try {
      await addDoc(collection(db, "contacts"), {
        ...data.basicInfo,
        ...data.contactInfo,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast.success("Contact created successfully");
    } catch {
      toast.error("Error creating contact");
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <FieldsWrapper>
        <h1 className="text-2xl font-bold">Summary</h1>
        <div>
          <p>
            Name: {data.basicInfo.firstName} {data.basicInfo.lastName}
          </p>
          <p>Email: {data.contactInfo.email}</p>
          <p>Phone: {formatPhoneNumber(data.contactInfo.phone)}</p>
        </div>
      </FieldsWrapper>
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
          }}
        >
          Create Contact
        </Button>
      </Navigation>
    </div>
  );
}
