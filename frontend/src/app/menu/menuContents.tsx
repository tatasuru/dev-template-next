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

export function MenuContents({
  items,
}: {
  items: {
    image: StaticImageData;
    badge: string;
    category: string;
    name: string;
    description: string;
    price: number;
    calorie: number;
    time: number;
    href: Route;
    size: "small" | "large";
  }[];
}) {
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map((item) => item.category))
    ).map((category) => ({
      name:
        category === "sandwich"
          ? "サンドウィッチ"
          : category === "drink"
          ? "ドリンク"
          : category === "side"
          ? "サイドメニュー"
          : category === "other"
          ? "その他"
          : category,
      value: category,
    }));

    return [{ name: "全て", value: "all" }, ...uniqueCategories];
  }, [items]);

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

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
            image={item.image}
            badge={item.badge}
            name={item.name}
            description={item.description}
            price={item.price}
            calorie={item.calorie}
            time={item.time}
            href={item.href}
            size={item.size}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
}
