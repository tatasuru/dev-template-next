import Image from "next/image";
// import Link from "next/link";
// import type { Route } from "next";
import type { StaticImageData } from "next/image";
import { Input } from "@/components/shadcn-ui/input";
import { Textarea } from "@/components/shadcn-ui/textarea";
import { Button } from "@/components/shadcn-ui/button";
import { Title } from "@/components/shared/title";
import { Icon } from "@/components/shared/icon";

import PlusIcon from "~icons/mdi/plus";
import MinusIcon from "~icons/mdi/minus";
import SandwichIcon from "../../../../public/sandwich-icon.png";

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

const categories: {
  icon: StaticImageData;
  text: string;
}[] = [
  {
    icon: SandwichIcon,
    text: "ホワイト",
  },
  {
    icon: SandwichIcon,
    text: "全粒粉",
  },
  {
    icon: SandwichIcon,
    text: "ライ麦",
  },
  {
    icon: SandwichIcon,
    text: "セサミ",
  },
];

export default async function MenuDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const recipe = await getRecipes(id);

  // const [quantity, setQuantity] = useState();

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
        <div className="flex flex-col gap-4">
          <Title title="パンの種類" />
          <div className="flex items-center justify-between">
            {categories.map((category, index) => (
              <Icon
                key={index}
                iconImage={category.icon}
                text={category.text}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Title title="野菜の種類" />
          <div className="flex items-center justify-between">
            {categories.map((category, index) => (
              <Icon
                key={index}
                iconImage={category.icon}
                text={category.text}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Title title="ソースの種類" />
          <div className="flex items-center justify-between">
            {categories.map((category, index) => (
              <Icon
                key={index}
                iconImage={category.icon}
                text={category.text}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Title title="個数" />
          <div className="flex items-center justify-between gap-2">
            <Button variant={"main"}>
              <PlusIcon className="size-5" />
            </Button>
            <Input
              type="number"
              min={1}
              max={10}
              defaultValue={1}
              className="text-center text-2xl text-main shadow-none"
            />
            <Button variant={"main"}>
              <MinusIcon className="size-5" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Title title="リクエスト" />
          <div className="flex items-center justify-between gap-2">
            <Textarea
              placeholder="リクエストを入力してください"
              className="w-full min-h-32 text-sm"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 bg-tertiary p-6 rounded-xl">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <p className="text-base font-bold text-muted-foreground">
                商品合計
              </p>
              <div className="w-fit flex items-center gap-1">
                <p className="text-2xl text-main font-black tracking-wider">
                  {recipe.base_price}
                  <span className="text-base font-bold">円</span>
                </p>
                <span className="text-xs font-medium text-muted-foreground">
                  (税込)
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex justify-end gap-2">
              {recipe.name} <span>2点</span>
            </p>
          </div>
          <Button variant={"main"} size={"lg"}>
            カートに入れる
          </Button>
        </div>
      </div>
    </div>
  );
}
