import type { ColumnDef } from "@tanstack/react-table";
import type { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { EllipsisVerticalIcon, EyeIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { db } from "@/lib/firebase";
import type { Contact } from "@/lib/types";
import { formatPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function deleteContact(id: string) {
  try {
    await deleteDoc(doc(db, "contacts", id));
    toast.success("Contact deleted successfully");
  } catch (error) {
    toast.error((error as FirebaseError).message);
  }
}

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return <p>{formatPhoneNumber(row.original.phone)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col text-left">
            <DropdownMenuItem asChild>
              <Link to={`/contact/${row.original.id}`}>
                <EyeIcon />
                <p>See details</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => deleteContact(row.original.id)}>
              <TrashIcon />
              <p>Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
