import { useCreateContactStore } from "@/store/create-contact";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import FieldsWrapper from "./components/fields-wrapper";
import Navigation from "./components/navigation";

export default function Summary() {
  const data = useCreateContactStore((state) => state.data);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <FieldsWrapper>
        <h1 className="text-2xl font-bold">Summary</h1>
        <div>
          <p>
            Name: {data.basicInfo?.firstName} {data.basicInfo?.lastName}
          </p>
          <p>Email: {data.contactInfo?.email}</p>
          <p>Phone: {data.contactInfo?.phone}</p>
        </div>
      </FieldsWrapper>
      <Navigation>
        <Button
          variant="outline"
          onClick={() => navigate("/create-contact/contact")}
        >
          Back
        </Button>
      </Navigation>
    </div>
  );
}
