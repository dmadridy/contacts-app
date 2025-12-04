import { PhoneIcon } from "lucide-react";

import { NO_DATA_MESSAGE } from "@/lib/constants";
import { formatPhoneNumber } from "@/lib/utils";

export default function Phone({ phone }: { phone: string | undefined }) {
  return (
    <div className="flex items-center gap-2">
      <PhoneIcon className="size-4" />
      <p>{phone ? formatPhoneNumber(phone) : NO_DATA_MESSAGE}</p>
    </div>
  );
}
