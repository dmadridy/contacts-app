import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { auth } from "@/lib/firebase";
import FieldsWrapper from "@/pages/create-contact/components/fields-wrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function SignInWithEmailDialog() {
  const form = useForm<FormSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: FormSchema) {
    try {
      await sendSignInLinkToEmail(auth, data.email, {
        url: `${window.location.href}?email=${data.email}`,
        handleCodeInApp: true,
      });
      toast.success("Email link sent to your email");
    } catch (error) {
      toast.error((error as FirebaseError).message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Sign in with email link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in with email link</DialogTitle>
          <DialogDescription>
            An email will be sent to your email to sign in
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldsWrapper>
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
              <Button type="submit">Send email link</Button>
            </FieldsWrapper>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
