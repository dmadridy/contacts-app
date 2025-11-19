import { Button } from "@/components/ui/button";
import { useCreateContactStore } from "@/store/create-contact";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/create-contact/navigation";
import FieldsWrapper from "../../components/create-contact/fields-wrapper";

export default function Summary() {
  const data = useCreateContactStore((state) => state.data);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
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
