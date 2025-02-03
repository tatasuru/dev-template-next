import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { StaticImageData } from "next/image";

export function Icon({
  iconImage,
  href,
  text,
}: Readonly<{
  iconImage: StaticImageData;
  href: Route;
  text?: string;
}>) {
  return (
    <Link
      href={href}
      className="flex w-fit flex-col items-center justify-center gap-2 text-center"
    >
      <div className="rounded-full p-1 bg-tertiary size-16 flex items-center justify-center">
        <Image src={iconImage} alt="icon" className="size-9" />
      </div>
      {text && <span className="text-xs font-bold">{text}</span>}
    </Link>
  );
}
