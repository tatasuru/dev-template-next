import { MenuContents } from "@/app/menu/menuContents";
import type { StaticImageData } from "next/image";
import type { Route } from "next";

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

async function getRecipes() {
  // TODO: dockerで立ち上げたサーバーにアクセスするためにhost.docker.internalを使う
  const res = await fetch("http://host.docker.internal:8000/recipes", {
    method: "GET",
    cache: "no-store",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recipes: ${res.status}`);
  }

  return res.json();
}

export default async function Menu() {
  const recipes = await getRecipes();
  const items = recipes.map((recipe: Recipe) => ({
    image_url: recipe.image_url,
    badge: recipe.badge,
    category: recipe.category,
    name: recipe.name,
    description: recipe.description,
    base_price: recipe.base_price,
    calories: recipe.calories,
    cooking_time: recipe.cooking_time,
    href: `/menu/${recipe.id}` as Route<`/menu/${string}`>,
    size: "large" as const,
  }));

  return (
    <div className="px-4 py-8 min-h-full h-fit">
      <div className="flex flex-col gap-3">
        <MenuContents items={items} />
      </div>
    </div>
  );
}
