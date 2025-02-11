import Image from "next/image";
import { MenuForm } from "@/app/menu/[id]/menuForm";
import PriceIcon from "~icons/solar/tag-price-bold";
import CalorieIcon from "~icons/solar/fire-bold";
import TimeIcon from "~icons/solar/clock-circle-bold";

type MetricItem = {
  icon: typeof PriceIcon;
  value: string;
};

async function getRecipeCustomization(id: string) {
  const res = await fetch(
    `http://host.docker.internal:8000/recipe_customizations?recipe_id=${id}`,
    {
      method: "GET",
      cache: "no-store",
      // credentials: "include",
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

export default async function MenuDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const recipeCustomization = await getRecipeCustomization(id);
  console.log(recipeCustomization.recipe);

  const metrics: MetricItem[] = [
    {
      icon: CalorieIcon,
      value: `${Number(
        recipeCustomization.recipe.calories
      ).toLocaleString()}Kcal`,
    },
    { icon: TimeIcon, value: `${recipeCustomization.recipe.cooking_time}min` },
  ];

  function MetricDisplay({ icon: Icon, value }: MetricItem) {
    return (
      <div className="flex items-center gap-px">
        <Icon className="w-4 h-4 text-sub" />
        <span className="text-xs font-medium">{value}</span>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 min-h-full h-fit flex flex-col gap-12">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Image
            src={`/${recipeCustomization.recipe.image_url}`}
            alt={recipeCustomization.recipe.name}
            priority
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-xl w-full h-auto"
          />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {recipeCustomization.recipe.name}
              </h2>
              <p className="text-main text-2xl font-bold">
                <span className="text-base">￥</span>
                {recipeCustomization.recipe.base_price}~
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-6">
              {recipeCustomization.recipe.description}
            </p>
            <div className="flex gap-2">
              {metrics.map((metric, index) => (
                <MetricDisplay key={index} {...metric} />
              ))}
            </div>
          </div>
        </div>
        <MenuForm
          recipe={recipeCustomization.recipe}
          customizationCategories={recipeCustomization.customization_categories}
        />
      </div>
    </div>
  );
}
