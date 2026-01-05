import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FirebaseError } from "firebase/app";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { PencilIcon, XIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import type { Contact } from "@/index";
import { KEYWORDS_OPTIONS } from "@/lib/constants";
import { db } from "@/lib/firebase";
import { useUserStore } from "@/lib/store/user";
import { formatPhoneNumber, stripPhoneFormatting } from "@/lib/utils";
import { phoneSchema } from "@/lib/zod-schemas/phone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  keywords: z
    .array(z.string().min(1, "Keyword is required"))
    .min(1, "Select at least one keyword")
    .max(10, "Maximum 10 keywords allowed"),
  email: z.string().email(),
  phone: phoneSchema,
});

type FormSchema = z.infer<typeof formSchema>;

export default function EditContactDialog({
  contact,
}: {
  contact: Contact | null;
}) {
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      keywords: [],
    },
    mode: "onChange",
  });

  const keywords = useWatch({
    control: form.control,
    name: "keywords",
  });

  function handleSelectKeyword(option: string) {
    const newKeywords = keywords?.some((item) => item === option)
      ? keywords.filter((item) => item !== option)
      : [...keywords, option];
    form.setValue("keywords", newKeywords, { shouldValidate: true });
  }

  async function editContact(data: FormSchema) {
    try {
      if (!id || !user?.uid) return;

      const userDocRef = doc(db, "users", user.uid);
      const unformattedPhone = stripPhoneFormatting(data.phone);
      await updateDoc(doc(userDocRef, "contacts", id), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: unformattedPhone, // Store unformatted phone number
        keywords: data.keywords,
        updatedAt: serverTimestamp(),
      });
      setOpen(false);
      toast.success("Contact edited successfully");
    } catch (error) {
      toast.error((error as FirebaseError).message);
    }
  }

  useEffect(() => {
    if (contact) {
      form.reset({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: formatPhoneNumber(contact.phone),
        keywords: contact.keywords,
      });
    }
  }, [contact, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <form
            onSubmit={form.handleSubmit(editContact)}
            className="flex flex-col gap-4"
          >
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
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                      placeholder="(XXX) XXX-XXXX"
                      maxLength={14} // (XXX) XXX-XXXX = 14 characters
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={() => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormDescription>
                    You can select up to 10 keywords
                  </FormDescription>
                  <DropdownMenu>
                    <FormControl>
                      <DropdownMenuTrigger asChild>
                        <Button
                          disabled={keywords?.length >= 10}
                          variant="outline"
                          className="w-full"
                        >
                          {keywords?.length > 0
                            ? `${keywords.length} keyword${keywords.length > 1 ? "s" : ""} selected`
                            : "Select keywords"}
                        </Button>
                      </DropdownMenuTrigger>
                    </FormControl>
                    <DropdownMenuContent
                      className="max-h-60 max-w-60"
                      align="start"
                      side="bottom"
                    >
                      {KEYWORDS_OPTIONS.map((keyword) => {
                        const isSelected = keywords?.some(
                          (item) => item === keyword,
                        );

                        return (
                          <DropdownMenuCheckboxItem
                            key={keyword}
                            checked={isSelected}
                            onCheckedChange={() => handleSelectKeyword(keyword)}
                          >
                            {keyword}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              )}
            />
            {keywords?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <Button
                    onClick={() => handleSelectKeyword(keyword)}
                    variant="outline"
                    size="sm"
                    key={keyword}
                  >
                    {keyword}
                    <XIcon className="size-4 cursor-pointer" />
                  </Button>
                ))}
              </div>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
