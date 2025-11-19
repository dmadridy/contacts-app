import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateContactForm from "./form";

export default function CreateContactDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Contact</DialogTitle>
          <DialogDescription>Create a new contact</DialogDescription>
        </DialogHeader>
        <CreateContactForm />
      </DialogContent>
    </Dialog>
  );
}
