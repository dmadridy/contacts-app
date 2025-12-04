import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { KEYWORDS_OPTIONS } from "@/lib/constants";
import { useCreateContactStore } from "@/lib/store/create-contact";
import { Button } from "@/components/ui/button";
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
import FieldsWrapper from "./components/fields-wrapper";
import Navigation from "./components/navigation";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  keywords: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .min(1, "Select at least one keyword")
    .max(10, "Maximum 10 keywords allowed"),
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

  const keywords = useWatch({
    control: form.control,
    name: "keywords",
  });

  function handleSelectKeyword(option: { label: string; value: string }) {
    const newKeywords = keywords.some((item) => item.value === option.value)
      ? keywords.filter((item) => item.value !== option.value)
      : [...keywords, option];
    form.setValue("keywords", newKeywords, {
      shouldValidate: true,
    });
  }

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
                        disabled={keywords.length >= 10}
                        variant="outline"
                        className="w-full"
                      >
                        {keywords.length > 0
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
                      const isSelected = keywords.some(
                        (item) => item.value === keyword.value,
                      );

                      return (
                        <DropdownMenuCheckboxItem
                          key={keyword.value}
                          checked={isSelected}
                          onCheckedChange={() => handleSelectKeyword(keyword)}
                        >
                          {keyword.label}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormMessage />
              </FormItem>
            )}
          />
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <Button
                  onClick={() => handleSelectKeyword(keyword)}
                  variant="outline"
                  size="sm"
                  key={keyword.value}
                >
                  {keyword.label}
                  <XIcon className="size-4 cursor-pointer" />
                </Button>
              ))}
            </div>
          )}
        </FieldsWrapper>
        <Navigation>
          <Button type="submit">Next</Button>
        </Navigation>
      </form>
    </Form>
  );
}
