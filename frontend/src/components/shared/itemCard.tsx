import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { StaticImageData } from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/shadcn-ui/card";
import { Badge } from "@/components/shadcn-ui/badge";
import PriceIcon from "~icons/solar/tag-price-bold";
import CalorieIcon from "~icons/solar/fire-bold";
import TimeIcon from "~icons/solar/clock-circle-bold";

type ItemCardProps = Readonly<{
  image: StaticImageData;
  badge?: string;
  name: string;
  description: string;
  price: number;
  calorie: number;
  time: number;
  href: Route;
  size: "large" | "small";
}>;

const LAYOUT_STYLES = {
  large: {
    container: "relative flex flex-col",
    header: "p-0 pb-3 rounded-t-xl relative h-[200px]",
    image: "!m-0 rounded-t-xl w-full h-full object-cover",
    content: "flex flex-col gap-1 p-3",
  },
  small: {
    container: "relative flex items-stretch",
    header: "w-[110px] h-auto min-h-[110px] p-0 shrink-0 relative",
    image: "!m-0 rounded-l-xl w-full h-full object-cover",
    content: "flex flex-col gap-2 p-3",
  },
} as const;

type MetricItem = {
  icon: typeof PriceIcon;
  value: string;
};

function MetricDisplay({ icon: Icon, value }: MetricItem) {
  return (
    <div className="flex items-center gap-px">
      <Icon className="w-4 h-4 text-sub" />
      <span className="text-xs font-bold">{value}</span>
    </div>
  );
}

export function ItemCard({
  image,
  badge,
  name,
  description,
  price,
  calorie,
  time,
  href,
  size,
}: ItemCardProps) {
  const styles = LAYOUT_STYLES[size];

  const metrics: MetricItem[] = [
    { icon: PriceIcon, value: `¥${price.toLocaleString()}〜` },
    { icon: CalorieIcon, value: `${calorie.toLocaleString()}Kcal` },
    { icon: TimeIcon, value: `${time}min` },
  ];

  return (
    <Card>
      <Link className={styles.container} href={href}>
        {badge && (
          <Badge className="absolute right-3 top-2 bg-sub text-white rounded-full">
            {badge}
          </Badge>
        )}
        <CardHeader className={styles.header}>
          <Image
            className={styles.image}
            src={image}
            alt="merchandise image"
            fill
          />
        </CardHeader>
        <div className="flex flex-col justify-between w-full">
          <CardContent className={styles.content}>
            <h3 className="text-sm font-bold max-w-40 line-clamp-1">{name}</h3>
            <p className="text-xs font-medium line-clamp-2">{description}</p>
          </CardContent>
          <CardFooter className="flex gap-2 p-3 pt-0">
            {metrics.map((metric, index) => (
              <MetricDisplay key={index} {...metric} />
            ))}
          </CardFooter>
        </div>
      </Link>
    </Card>
  );
}
