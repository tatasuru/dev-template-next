"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/shadcn-ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";
import { Input } from "@/components/shadcn-ui/input";
import { format } from "date-fns";
import { cn } from "@/utils/shadcn";
import { Calendar } from "@/components/shadcn-ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingIcon from "~icons/line-md/loading-twotone-loop";

const formSchema = z.object({
  name: z
    .string({ required_error: "お名前を入力してください。" })
    .min(2, { message: "お名前をフルネームで入力してください。" })
    .max(50, { message: "お名前をフルネームで入力してください。" }),
  phone_number: z
    .string({ required_error: "有効な電話番号を入力してください。" })
    .min(10, { message: "有効な電話番号を入力してください。" })
    .max(15, { message: "有効な電話番号を入力してください。" }),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "性別を選択してください。",
  }),
  birth_date: z.date({ required_error: "生年月日を選択してください。" }),
});

export function SetupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      gender: "MALE",
      birth_date: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let userId = "";
    try {
      setIsSubmitting(true);

      const userInfo = await registerUserInfo(values);
      userId = userInfo.id;

      await createCartByUserId(userId);

      // Show a success toast.
      setTimeout(() => {
        toast({
          variant: "success",
          title: "登録完了",
          description: "HOMEへリダイレクトします。",
        });
      }, 2000);

      // Redirect to the next page
      setTimeout(() => {
        router.push("/");
        setIsSubmitting(false);
      }, 4000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      deleteUserInfo(userId);
      toast({
        variant: "destructive",
        title: "エラー",
        description: "ユーザー情報の登録に失敗しました。",
      });
    }
  }

  async function registerUserInfo(body: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  }

  async function deleteUserInfo(userId: string) {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  }

  async function createCartByUserId(userId: string) {
    try {
      const response = await fetch("http://localhost:8000/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
        }),
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>お名前</FormLabel>
              <FormControl>
                <Input placeholder="山田 太郎" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>電話番号</FormLabel>
              <FormControl>
                <Input placeholder="090-0000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>性別</FormLabel>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={field.value === "MALE" ? "main" : "outline"}
                  className="w-full"
                  onClick={() => field.onChange("MALE")}
                >
                  男性
                </Button>
                <Button
                  type="button"
                  variant={field.value === "FEMALE" ? "main" : "outline"}
                  className="w-full"
                  onClick={() => field.onChange("FEMALE")}
                >
                  女性
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>生年月日</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>生年月日を選択してください。</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    defaultMonth={new Date(1996, 3)}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    mode="single"
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    classNames={{
                      table: "w-full",
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size={"default"}
          type="submit"
          variant="main"
          className="w-full py-2"
          disabled={isSubmitting}
        >
          {!isSubmitting && "登録する"}
          {isSubmitting && <LoadingIcon className="!size-6 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
