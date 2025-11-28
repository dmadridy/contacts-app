import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useCreateContactStore } from "@/lib/store/create-contact";
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
import FieldsWrapper from "./components/fields-wrapper";
import Navigation from "./components/navigation";

const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Contact() {
  const navigate = useNavigate();
  const data = useCreateContactStore((state) => state.data);
  const setData = useCreateContactStore((state) => state.setData);

  const form = useForm<FormSchema>({
    defaultValues: data.contactInfo,
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  function onSubmit(data: FormSchema) {
    setData({
      contactInfo: data,
    });
    navigate("/create-contact/summary");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex min-h-screen flex-col"
      >
        <FieldsWrapper>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldsWrapper>
        <Navigation>
          <Button onClick={() => navigate("/create-contact")} variant="outline">
            Back
          </Button>
          <Button type="submit">Next</Button>
        </Navigation>
      </form>
    </Form>
  );
}
