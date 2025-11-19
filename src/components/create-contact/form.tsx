import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CreateContactForm() {
  const form = useForm<FormSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormSchema) {
    toast.success(`Contact ${data.name} created successfully`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Contact</Button>
      </form>
    </Form>
  );
}
