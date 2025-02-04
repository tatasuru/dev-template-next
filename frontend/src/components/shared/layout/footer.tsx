"use client";

import HomeIcon from "~icons/mdi/home";
import UserIcon from "~icons/solar/user-circle-bold";
import MenuIcon from "~icons/mdi/list-box";
import CloseIcon from "~icons/mdi/close";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NAV_ITEMS = [
  {
    href: "/setup",
    icon: UserIcon,
    transform: "translate-x-[calc(100%+1rem)]",
  },
  {
    href: "/menu",
    icon: MenuIcon,
    transform: "-translate-x-[calc(100%+1rem)]",
  },
  {
    href: "/",
    icon: HomeIcon,
    transform: "-translate-y-[calc(100%+1rem)]",
  },
];

interface NavButtonProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  transform: string;
  isOpen: boolean;
}

function NavButton({ href, icon: Icon, transform, isOpen }: NavButtonProps) {
  return (
    <Link
      href={href}
      className={`
        bg-white w-16 h-16 rounded-full border border-main
        flex items-center justify-center
        absolute top-0 left-0
        transition-transform duration-300
        ${isOpen ? transform : "translate-x-0"}
      `}
    >
      <Icon className="!size-12 text-main" />
    </Link>
  );
}

function CurrentIcon() {
  const currentPath = usePathname();
  const IconComponent =
    NAV_ITEMS.find((item) =>
      currentPath.includes(item.href === "/" ? item.href : item.href.slice(1))
    )?.icon || CloseIcon;

  return <IconComponent className="!size-12 text-main" />;
}

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  // observe path change to close the footer
  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="sticky bottom-6 left-1/2 -translate-x-1/2 w-fit h-fit">
      <button
        className="bg-white w-16 h-16 rounded-full border border-main flex items-center justify-center z-10 relative cursor-pointer"
        onClick={toggle}
      >
        {!isOpen ? (
          <CurrentIcon />
        ) : (
          <CloseIcon className="!size-12 text-main" />
        )}
      </button>

      {NAV_ITEMS.map((item) => (
        <NavButton key={item.href} {...item} isOpen={isOpen} />
      ))}
    </div>
  );
}
