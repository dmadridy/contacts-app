import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useCreateContactStore } from "@/lib/store/create-contact";
import { formatPhoneNumber, stripPhoneFormatting } from "@/lib/utils";
import { phoneSchema } from "@/lib/zod-schemas/phone";
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
  phone: phoneSchema,
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
      contactInfo: {
        email: data.email,
        phone: stripPhoneFormatting(data.phone),
      },
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
                  <Input
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
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
