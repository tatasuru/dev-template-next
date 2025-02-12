"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { StaticImageData } from "next/image";
import { z } from "zod";
import { Icon } from "@/components/shared/icon";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import LoadingIcon from "~icons/line-md/loading-twotone-loop";

import PlusIcon from "~icons/mdi/plus";
import MinusIcon from "~icons/mdi/minus";

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

export function MenuForm(
  props: Readonly<{
    recipe: {
      name: string;
      base_price: number;
      description: string;
    };
    customizationCategories: {
      id: number;
      name: string;
      value: string;
      display_order: number;
      multiple_select: boolean;
      required: boolean;
      options: {
        id: number;
        image_url: StaticImageData;
        name: string;
        additional_price: number;
        display_order: number;
      }[];
    }[];
  }>
) {
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

  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values, totalPrice);

    // write api request here
    setTimeout(() => {
      toast({
        variant: "success",
        title: "カートに追加しました",
        description: "カートページにリダイレクトします",
      });
    }, 2000);

    // Redirect to the next page
    setTimeout(() => {
      setIsLoading(false);
      router.push("/cart");
    }, 4000);
  }

  const breads = useMemo(
    () =>
      props.customizationCategories
        .find((category) => category.value === "breads")
        ?.options.map((option) => ({
          image_url: option.image_url,
          name: option.name,
          additional_price: option.additional_price,
        })) ?? [],
    [props.customizationCategories]
  );

  const vegetables = useMemo(
    () =>
      props.customizationCategories
        .find((category) => category.value === "vegetables")
        ?.options.map((option) => ({
          image_url: option.image_url,
          name: option.name,
          additional_price: option.additional_price,
        })) ?? [],
    [props.customizationCategories]
  );

  const sources = useMemo(
    () =>
      props.customizationCategories
        .find((category) => category.value === "sources")
        ?.options.map((option) => ({
          image_url: option.image_url,
          name: option.name,
          additional_price: option.additional_price,
        })) ?? [],
    [props.customizationCategories]
  );

  const [totalPrice, setTotalPrice] = useState(props.recipe.base_price);
  const quantity = form.watch("quantity");
  const selectedBread = form.watch("bread");
  const selectedVegetables = form.watch("vegetables");
  const selectedSource = form.watch("source");

  // calculate total price
  useEffect(() => {
    const breadPrice =
      breads.find((b) => b.name === selectedBread)?.additional_price ?? 0;
    const vegetablesPrice = selectedVegetables.reduce((acc, vegName) => {
      const veg = vegetables.find((v) => v.name === vegName);
      return acc + (veg?.additional_price ?? 0);
    }, 0);
    const sourcePrice =
      sources.find((s) => s.name === selectedSource)?.additional_price ?? 0;

    const baseWithOptions =
      props.recipe.base_price + breadPrice + vegetablesPrice + sourcePrice;
    setTotalPrice(baseWithOptions);
  }, [
    selectedBread,
    selectedVegetables,
    selectedSource,
    props.recipe.base_price,
    breads,
    vegetables,
    sources,
  ]);

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
                      iconImage={bread.image_url}
                      text={bread.name}
                      {...field}
                      selected={field.value === bread.name}
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(bread.name);
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
                  <FormControl key={vegetable.name}>
                    <Icon
                      iconImage={vegetable.image_url}
                      text={vegetable.name}
                      selected={field.value.includes(vegetable.name)}
                      onClick={(e) => {
                        e.preventDefault();
                        const currentValues = field.value || [];
                        const newValues = currentValues.includes(vegetable.name)
                          ? currentValues.filter(
                              (value) => value !== vegetable.name
                            )
                          : [...currentValues, vegetable.name];
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
                      iconImage={source.image_url}
                      text={source.name}
                      {...field}
                      selected={field.value === source.name}
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(source.name);
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
                      value={field.value}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        if (value >= 1) {
                          field.onChange(value);
                        }
                      }}
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
                    {totalPrice * quantity}
                    <span className="text-base font-bold">円</span>
                  </p>
                  <span className="text-xs font-medium text-muted-foreground">
                    (税込)
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex justify-end gap-2">
                {props.recipe.name}
                <span>{quantity}個</span>
              </p>
            </div>
            <Button variant={"main"} size={"lg"} type="submit">
              {isLoading ? (
                <LoadingIcon className="!size-6 animate-spin" />
              ) : (
                "カートに入れる"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
