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
import Sandwich from "../../public/sandwich.png";
import SandwichIcon from "../../public/sandwich-icon.png";
import SideMenuIcon from "../../public/sidemenu-icon.png";
import DrinkIcon from "../../public/drink-icon.png";
import OtherIcon from "../../public/other-icon.png";

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

const items: {
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
}[] = [
  {
    image: Sandwich,
    badge: "New",
    category: "sandwich",
    name: "クラブサンドウィッチ",
    description:
      "ここに説明が入るここに説明が入るここに説明が入るここに説明が入る",
    price: 1500,
    calorie: 1500,
    time: 20,
    href: "/menu",
    size: "large",
  },
  {
    image: Sandwich,
    badge: "New",
    category: "sandwich",
    name: "クラブサンドウィッチ",
    description:
      "ここに説明が入るここに説明が入るここに説明が入るここに説明が入る",
    price: 1500,
    calorie: 1500,
    time: 20,
    href: "/menu",
    size: "large",
  },
  {
    image: Sandwich,
    badge: "New",
    category: "sandwich",
    name: "クラブサンドウィッチ",
    description:
      "ここに説明が入るここに説明が入るここに説明が入るここに説明が入る",
    price: 1500,
    calorie: 1500,
    time: 20,
    href: "/menu",
    size: "large",
  },
];

export default function Home() {
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
