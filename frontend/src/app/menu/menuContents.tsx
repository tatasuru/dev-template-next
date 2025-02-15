"use client";

import { ItemCard } from "@/components/shared/itemCard";
import type { StaticImageData } from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui/tabs";
import type { Route } from "next";
import { useState, useMemo } from "react";

interface Recipe {
  id: number;
  image_url: StaticImageData;
  category_id: number;
  badge: string;
  category: {
    id: number;
    name: string;
    display_order: number;
    createdAt: string;
    updatedAt: string;
  };
  name: string;
  description: string;
  base_price: number;
  calories: number;
  cooking_time: number;
  href: Route;
  size: "small" | "large";
  is_sold_out: boolean;
}

export function MenuContents({ items }: { items: Recipe[] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategoryNamesAndId = Array.from(
      new Set(
        items
          .map((item) => item.category)
          .map((category) => JSON.stringify(category))
      )
    ).map((str) => JSON.parse(str));

    const categoryList = uniqueCategoryNamesAndId
      .map((category) => ({
        name:
          category.name === "sandwich"
            ? "サンドウィッチ"
            : category.name === "drink"
            ? "ドリンク"
            : category.name === "side"
            ? "サイドメニュー"
            : category.name === "other"
            ? "その他"
            : category.name,
        value: category.name,
        id: category.id,
      }))
      .sort((a, b) => a.id - b.id);

    return [{ name: "全て", value: "all" }, ...categoryList];
  }, [items]);

  // Filter items by category
  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category.name === activeCategory);

  return (
    <Tabs value={activeCategory} className="w-full overflow-hidden">
      <div className="overflow-x-auto w-full no-scrollbar">
        <TabsList className="bg-white justify-between">
          {categories.map((category, index) => (
            <TabsTrigger
              key={index}
              value={category.value}
              className="data-[state=active]:bg-main rounded-full data-[state=active]:text-white text-sm"
              onClick={() => setActiveCategory(category.value)}
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value={activeCategory} className="grid grid-cols-1 gap-4">
        {filteredItems.map((item, index) => (
          <ItemCard
            key={index}
            image_url={item.image_url}
            badge={item.badge}
            name={item.name}
            description={item.description}
            price={item.base_price}
            calorie={item.calories}
            time={item.cooking_time}
            href={item.href}
            size={item.size}
            is_sold_out={item.is_sold_out}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
}
