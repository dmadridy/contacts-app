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
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Basic() {
  const navigate = useNavigate();
  const data = useCreateContactStore((state) => state.data);
  const setData = useCreateContactStore((state) => state.setData);

  const form = useForm<FormSchema>({
    defaultValues: data.basicInfo,
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  function onSubmit(data: FormSchema) {
    setData({
      basicInfo: data,
    });
    navigate("/create-contact/contact");
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
        </FieldsWrapper>
        <Navigation>
          <Button type="submit">Next</Button>
        </Navigation>
      </form>
    </Form>
  );
}
