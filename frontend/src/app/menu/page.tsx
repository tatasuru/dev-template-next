import { MenuContents } from "@/app/menu/menuContents";
import type { StaticImageData } from "next/image";
import type { Route } from "next";
import Sandwich from "../../../public/sandwich.png";
import Coffee from "../../../public/coffee.jpg";
import Orange from "../../../public/orange.jpeg";
import Potato from "../../../public/potato.webp";

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
  {
    image: Orange,
    badge: "New",
    category: "drink",
    name: "オレンジジュース",
    description:
      "ここに説明が入るここに説明が入るここに説明が入るここに説明が入る",
    price: 1500,
    calorie: 1500,
    time: 20,
    href: "/menu",
    size: "large",
  },
  {
    image: Coffee,
    badge: "New",
    category: "drink",
    name: "コーヒー",
    description:
      "ここに説明が入るここに説明が入るここに説明が入るここに説明が入る",
    price: 1500,
    calorie: 1500,
    time: 20,
    href: "/menu",
    size: "large",
  },
  {
    image: Potato,
    badge: "New",
    category: "side",
    name: "ポテト",
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
    category: "other",
    name: "その他のメニュー",
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
    <div className="px-4 py-8 min-h-full h-fit">
      <div className="flex flex-col gap-3">
        <MenuContents items={items} />
      </div>
    </div>
  );
}
