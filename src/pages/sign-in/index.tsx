import { zodResolver } from "@hookform/resolvers/zod";
import type { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { auth, provider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleSignInButton from "@/components/google-sign-in-button";
import FieldsWrapper from "../create-contact/components/fields-wrapper";
import SignInWithEmailDialog from "./components/sign-in-with-email-dialog";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormSchema = z.infer<typeof formSchema>;

export default function SignIn() {
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: FormSchema) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
      toast.success("Signed in successfully");
    } catch (error) {
      toast.error((error as FirebaseError).message);
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center gap-4">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign In</Button>
            <p className="text-muted-foreground text-center text-sm">
              Don't have an account?&nbsp;
              <Link className="text-primary hover:underline" to="/sign-up">
                Sign up
              </Link>
            </p>
          </FieldsWrapper>
        </form>
      </Form>
      <div className="flex flex-col items-center justify-center gap-4">
        <SignInWithEmailDialog />
        <Button
          variant="outline"
          type="button"
          onClick={() => signInWithPopup(auth, provider)}
        >
          Sign in with Google via popup
        </Button>
        <GoogleSignInButton />
      </div>
    </div>
  );
}
