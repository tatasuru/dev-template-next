import * as React from "react";
import { Title } from "@/components/shared/title";
import { Icon } from "@/components/shared/icon";
import { ItemCard } from "@/components/shared/itemCard";
import { BusinessDayCalendar } from "@/components/home/businessDayCalendar";
import { Button } from "@/components/shadcn-ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn-ui/carousel";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { StaticImageData } from "next/image";
import Banner from "../../public/banner.png";
import SandwichIcon from "../../public/sandwich-icon.png";
import SideMenuIcon from "../../public/sidemenu-icon.png";
import DrinkIcon from "../../public/drink-icon.png";
import OtherIcon from "../../public/other-icon.png";

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
}

const categories: {
  icon: StaticImageData;
  text: string;
  href: Route;
}[] = [
  {
    icon: SandwichIcon,
    text: "サンドイッチ",
    href: "/menu",
  },
  {
    icon: DrinkIcon,
    text: "ドリンク",
    href: "/menu",
  },
  {
    icon: SideMenuIcon,
    text: "サイド",
    href: "/menu",
  },
  {
    icon: OtherIcon,
    text: "その他",
    href: "/menu",
  },
];

async function getRecipes() {
  const res = await fetch(
    "http://host.docker.internal:8000/recipes?size=3&category_id=3",
    {
      method: "GET",
      cache: "no-store",

      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch recipes: ${res.status}`);
  }

  return res.json();
}

export default async function Home() {
  const recipes = await getRecipes();
  const items: Recipe[] = recipes.map((recipe: Recipe) => ({
    image_url: recipe.image_url,
    badge: recipe.badge,
    category: recipe.category,
    name: recipe.name,
    description: recipe.description,
    base_price: recipe.base_price,
    calories: recipe.calories,
    cooking_time: recipe.cooking_time,
    href: `/menu/${recipe.id}` as Route<`/menu/${string}`>,
    size: "small" as const,
  }));

  return (
    <div className="px-4 py-8 min-h-full h-fit grid gap-10">
      <div className="grid gap-5">
        <Title title="クーポン" href="/coupon" label="詳細へ" />
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index} className="basis-10/12">
                <div className="p-1">
                  <Image
                    src={Banner}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="grid gap-5">
        <Title title="カテゴリー" href="/menu" label="メニューへ" />
        <div className="flex items-center justify-between">
          {categories.map((category, index) => (
            <Icon
              key={index}
              iconImage={category.icon}
              text={category.text}
              href={category.href}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-5">
        <Title title="おすすめメニュー" href="/menu" label="メニューへ" />
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
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
            />
          ))}
        </div>
        <Button size="default" variant="main" className="w-full py-2" asChild>
          <Link href="/menu">すべてのメニューを見る</Link>
        </Button>
      </div>
      <div className="grid gap-5">
        <Title title="営業日" />
        <BusinessDayCalendar />
      </div>
      <div className="grid gap-5">
        <Title title="アクセス" />
      </div>
    </div>
  );
}
