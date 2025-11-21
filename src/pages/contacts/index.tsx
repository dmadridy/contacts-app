import { Link } from "react-router-dom";

import type { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

const data: Contact[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (234) 567-8900",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (234) 567-8901",
  },
];

export default function Contacts() {
  return (
    <div className="flex flex-col gap-4">
      <Button asChild className="self-end">
        <Link to="/create-contact">Create Contact</Link>
      </Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
