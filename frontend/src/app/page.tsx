import { Title } from "@/components/shared/title";
import { Icon } from "@/components/shared/icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn-ui/carousel";
import Image from "next/image";
import Banner from "../../public/banner.png";
import SandwichIcon from "../../public/sandwich-icon.png";
import SideMenuIcon from "../../public/sidemenu-icon.png";
import DrinkIcon from "../../public/drink-icon.png";
import OtherIcon from "../../public/other-icon.png";

const categories = [
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

export default function Home() {
  return (
    <div className="px-4 py-8 min-h-full h-fit grid gap-8">
      <div className="grid gap-5">
        <Title title="クーポン" href="/coupon" label="詳細へ" />
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm"
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
    </div>
  );
}
