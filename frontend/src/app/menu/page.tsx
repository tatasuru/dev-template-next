import { Title } from "@/components/shared/title";
import { ItemCard } from "@/components/shared/itemCard";
import type { StaticImageData } from "next/image";
import type { Route } from "next";
import Sandwich from "../../../public/sandwich.png";

const items: {
  image: StaticImageData;
  badge: string;
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

export default function Menu() {
  return (
    <div className="px-4 py-8 min-h-full h-fit grid gap-8">
      <Title title="メニュー" />
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
    </div>
  );
}
