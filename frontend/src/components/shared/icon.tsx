import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { StaticImageData } from "next/image";
import { Button } from "@/components/shadcn-ui/button";

export function Icon({
  iconImage,
  href,
  text,
  selected,
  onClick,
}: Readonly<{
  iconImage: StaticImageData;
  href?: Route;
  text?: string;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}>) {
  const content = (
    <>
      <Button
        type="button"
        onClick={onClick}
        className={`rounded-full p-1 w-16 h-16 flex items-center justify-center
          ${selected ? "bg-main" : "bg-tertiary"}
          ${selected ? "hover:bg-main" : "hover:bg-tertiary"}
          `}
      >
        <Image
          src={iconImage}
          alt="icon"
          width={64}
          height={64}
          className={`size-9 ${selected ? "brightness-0 invert" : ""}`}
        />
      </Button>
      {text && <span className="text-xs font-bold">{text}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex w-fit flex-col items-center justify-center gap-2 text-center"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="flex w-fit flex-col items-center justify-center gap-2 text-center">
      {content}
    </div>
  );
}
