import { Button } from "@/components/shadcn-ui/button";
// import { Input } from "@/components/shadcn-ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn-ui/accordion";
import { Separator } from "@/components/shadcn-ui/separator";

import Link from "next/link";
import { ItemCard } from "@/components/shared/itemCard";
import { Icon } from "@/components/shared/icon";
import { StaticImageData } from "next/image";
import PlusIcon from "~icons/mdi/plus";
// import MinusIcon from "~icons/mdi/minus";

export default function Cart() {
  return (
    <div className="px-4 py-8 min-h-full h-fit grid gap-8">
      <Button variant={"link"} className="w-full text-main">
        <Link href="/menu" className="flex items-center gap-2">
          <PlusIcon className="w-6 h-6" />
          引き続きメニューを見る
        </Link>
      </Button>
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full border rounded-md p-4 flex flex-col gap-4">
          <ItemCard
            image_url={"sandwich.png" as unknown as StaticImageData}
            badge="新着"
            name="ハンバーガー"
            description="ハンバーガーの説明"
            calorie={500}
            time={10}
            href="/menu/3"
            size="small"
            className="border-none"
          />
          <div className="w-full flex flex-col">
            <Separator />
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>カスタマイズ詳細</AccordionTrigger>
                <AccordionContent className="grid grid-cols-4 gap-4">
                  <Icon
                    iconImage={
                      "/sandwich-icon.png" as unknown as StaticImageData
                    }
                    text="ホワイト"
                    href="/topping"
                  />
                  <Icon
                    iconImage={
                      "/sandwich-icon.png" as unknown as StaticImageData
                    }
                    text="ホワイト"
                    href="/topping"
                  />
                  <Icon
                    iconImage={
                      "/sandwich-icon.png" as unknown as StaticImageData
                    }
                    text="ホワイト"
                    href="/topping"
                  />
                  <Icon
                    iconImage={
                      "/sandwich-icon.png" as unknown as StaticImageData
                    }
                    text="ホワイト"
                    href="/topping"
                  />
                  <Icon
                    iconImage={
                      "/sandwich-icon.png" as unknown as StaticImageData
                    }
                    text="ホワイト"
                    href="/topping"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>リクエスト</AccordionTrigger>
                <AccordionContent>
                  リクエストの説明リクエストの説明 リクエストの説明
                  リクエストの説明。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="pt-4 flex justify-between items-center">
              <p className="text-main font-bold text-2xl">
                <span className="text-base">￥</span>
                1,000
              </p>
              {/* TODO: consider if it is necessary */}
              {/* <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant={"main"}
                  className="rounded-full p-4 size-8"
                >
                  <MinusIcon className="size-4" />
                </Button>
                <Input
                  type="number"
                  defaultValue={1}
                  className="text-center text-xl text-main shadow-none w-16"
                />
                <Button
                  type="button"
                  variant={"main"}
                  className="rounded-full p-4 size-8"
                >
                  <PlusIcon className="size-4" />
                </Button>
              </div> */}
            </div>
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
                  1,000
                  <span className="text-base font-bold">円</span>
                </p>
                <span className="text-xs font-medium text-muted-foreground">
                  (税込)
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex justify-end gap-2">
              ハンバーガー
              <span>1個</span>
            </p>
          </div>
          <Button variant={"main"} size={"lg"} type="submit">
            オーダーに進む
          </Button>
        </div>
      </div>
    </div>
  );
}
