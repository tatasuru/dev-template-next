import Image from "next/image";
import { MenuForm } from "@/app/menu/[id]/menuForm";

async function getRecipes(id: string) {
  const res = await fetch(`http://host.docker.internal:8000/recipes/${id}`, {
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

export default async function MenuDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const recipe = await getRecipes(id);

  return (
    <div className="px-4 py-8 min-h-full h-fit flex flex-col gap-12">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Image
            src={`/${recipe.image_url}`}
            alt={recipe.name}
            priority
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-xl w-full h-auto"
          />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{recipe.name}</h2>
              <p className="text-main text-2xl font-bold">
                <span className="text-base">￥</span>
                {recipe.base_price}~
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {recipe.description}
            </p>
          </div>
        </div>
        <MenuForm recipe={recipe} />
      </div>
    </div>
  );
}
