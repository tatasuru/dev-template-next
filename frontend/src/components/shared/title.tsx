import Link from "next/link";
import type { Route } from "next";

export function Title({
  title,
  href,
  label,
}: Readonly<{
  title: string;
  href?: Route;
  label?: string;
}>) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-lg font-bold">{title}</h1>
      <Link
        href={href || ""}
        className="text-sm text-main font-medium hover:underline"
      >
        {label}
      </Link>
    </div>
  );
}
