import { PencilIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, useParams } from "react-router-dom";
import { toast } from "sonner";

import type { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function EditContactDialog({
  contact,
}: {
  contact: Contact | null;
}) {
  const form = useForm<Contact>({
    defaultValues: contact ?? {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  async function editContact() {
    try {
      form.handleSubmit(editContact)();
    } catch {
      toast.error("Error editing contact");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(editContact)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
