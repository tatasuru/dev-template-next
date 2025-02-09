"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { StaticImageData } from "next/image";
import { z } from "zod";
import { Icon } from "@/components/shared/icon";

import PlusIcon from "~icons/mdi/plus";
import MinusIcon from "~icons/mdi/minus";
import SandwichIcon from "../../../../public/sandwich-icon.png";

import { Textarea } from "@/components/shadcn-ui/textarea";
import { Button } from "@/components/shadcn-ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";

const formSchema = z.object({
  bread: z.string().min(1, {
    message: "少なくとも1つ選択してください",
  }),
  vegetables: z.array(z.string()).min(1, {
    message: "少なくとも1つ選択してください",
  }),
  source: z.string().min(1, {
    message: "少なくとも1つ選択してください",
  }),
  quantity: z.number().min(1, {
    message: "1以上の数値を入力してください",
  }),
  request: z.string().optional(),
});

const breads: {
  icon: StaticImageData;
  text: string;
  value: string;
}[] = [
  {
    icon: SandwichIcon,
    text: "ホワイト",
    value: "white",
  },
  {
    icon: SandwichIcon,
    text: "全粒粉",
    value: "wholewheat",
  },
  {
    icon: SandwichIcon,
    text: "ライ麦",
    value: "rye",
  },
  {
    icon: SandwichIcon,
    text: "セサミ",
    value: "sesame",
  },
];

const vegetables: {
  icon: StaticImageData;
  text: string;
  value: string;
}[] = [
  {
    icon: SandwichIcon,
    text: "玉ねぎ",
    value: "onion",
  },
  {
    icon: SandwichIcon,
    text: "トマト",
    value: "tomato",
  },
  {
    icon: SandwichIcon,
    text: "オリーブ",
    value: "olive",
  },
  {
    icon: SandwichIcon,
    text: "レタス",
    value: "lettuce",
  },
];

const sources: {
  icon: StaticImageData;
  text: string;
  value: string;
}[] = [
  {
    icon: SandwichIcon,
    text: "チリソース",
    value: "chili",
  },
  {
    icon: SandwichIcon,
    text: "サルサソース",
    value: "salsa",
  },
  {
    icon: SandwichIcon,
    text: "マヨネーズ",
    value: "mayo",
  },
  {
    icon: SandwichIcon,
    text: "ケチャップ",
    value: "ketchup",
  },
];

export function MenuForm(
  props: Readonly<{
    recipe: {
      name: string;
      base_price: number;
      description: string;
    };
  }>
) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bread: "",
      vegetables: [],
      source: "",
      quantity: 1,
      request: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* bread */}
        <FormField
          control={form.control}
          name="bread"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-bold">パンの種類</FormLabel>
              <div className="flex items-center justify-between">
                {breads.map((bread, index) => (
                  <FormControl key={index}>
                    <Icon
                      iconImage={bread.icon}
                      text={bread.text}
                      {...field}
                      selected={field.value === bread.value}
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(bread.value);
                      }}
                    />
                  </FormControl>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* vegetables */}
        <FormField
          control={form.control}
          name="vegetables"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-bold">
                野菜の種類{" "}
                <span className="text-xs text-muted-foreground">
                  （複数選択可）
                </span>
              </FormLabel>
              <div className="flex items-center justify-between">
                {vegetables.map((vegetable) => (
                  <FormControl key={vegetable.value}>
                    <Icon
                      iconImage={vegetable.icon}
                      text={vegetable.text}
                      selected={field.value.includes(vegetable.value)}
                      onClick={(e) => {
                        e.preventDefault();
                        const currentValues = field.value || [];
                        const newValues = currentValues.includes(
                          vegetable.value
                        )
                          ? currentValues.filter(
                              (value) => value !== vegetable.value
                            )
                          : [...currentValues, vegetable.value];
                        field.onChange(newValues);
                      }}
                    />
                  </FormControl>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* source */}
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-bold">ソースの種類</FormLabel>
              <div className="flex items-center justify-between">
                {sources.map((source, index) => (
                  <FormControl key={index}>
                    <Icon
                      iconImage={source.icon}
                      text={source.text}
                      {...field}
                      selected={field.value === source.value}
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(source.value);
                      }}
                    />
                  </FormControl>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* quantity */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-bold">個数</FormLabel>
              <div className="flex items-center justify-between">
                <FormControl className="w-full">
                  <div className="flex items-center justify-between gap-2">
                    <Button
                      type="button"
                      variant={"main"}
                      onClick={(e) => {
                        e.preventDefault();
                        if (field.value > 1) {
                          field.onChange(field.value - 1);
                        }
                      }}
                    >
                      <MinusIcon className="size-5" />
                    </Button>
                    <Input
                      type="number"
                      defaultValue={field.value}
                      className="text-center text-2xl text-main shadow-none"
                    />
                    <Button
                      type="button"
                      variant={"main"}
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(field.value + 1);
                      }}
                    >
                      <PlusIcon className="size-5" />
                    </Button>
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* request */}
        <FormField
          control={form.control}
          name="request"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-bold">リクエスト</FormLabel>
              <div className="flex items-center justify-between">
                <FormControl className="w-full">
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="w-full min-h-32 text-sm"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 bg-tertiary p-6 rounded-xl">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <p className="text-base font-bold text-muted-foreground">
                  商品合計
                </p>
                <div className="w-fit flex items-center gap-1">
                  <p className="text-2xl text-main font-black tracking-wider">
                    {props.recipe.base_price * form.getValues().quantity}
                    <span className="text-base font-bold">円</span>
                  </p>
                  <span className="text-xs font-medium text-muted-foreground">
                    (税込)
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex justify-end gap-2">
                {props.recipe.name}
                <span>{form.getValues().quantity}個</span>
              </p>
            </div>
            <Button variant={"main"} size={"lg"} type="submit">
              カートに入れる
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
