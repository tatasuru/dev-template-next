"use client";

import UserIcon from "~icons/solar/user-circle-bold";
import LeftArrowIcon from "~icons/solar/alt-arrow-left-line-duotone";
import CloseIcon from "~icons/mdi/close";
import SearchIcon from "~icons/solar/magnifer-linear";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/shadcn-ui/button";

export function Header() {
  const router = useRouter();
  const currentPath = usePathname();
  const currentPathName = currentPath.split("/")[1];

  return (
    <div className="bg-main p-4 w-full fixed top-0 left-0 right-0 z-50 min-h-[76px] flex items-center">
      <div className="flex items-center justify-between w-full h-full">
        {/* left */}
        <div>
          {currentPath === "/" && (
            <div className="flex flex-col">
              <span className="text-xs text-white">ようこそ</span>
              <p className="text-lg font-bold text-white">texttexttext</p>
            </div>
          )}

          {currentPath !== "/" && currentPath !== "/setup" && (
            <Button
              variant="main"
              size="icon"
              className="flex size-fit items-center rounded-full p-0"
              onClick={() => router.back()}
            >
              <LeftArrowIcon className="!size-8 text-white" />
            </Button>
          )}

          {currentPath === "" && (
            <Button
              variant="main"
              size="icon"
              className="flex size-fit items-center rounded-full p-0"
              onClick={() => router.back()}
            >
              <CloseIcon className="!size-8 text-white" />
            </Button>
          )}
        </div>

        {/* center */}
        {currentPath !== "/" && (
          <h1 className="text-lg font-bold text-white">
            {currentPathName.toUpperCase()}
          </h1>
        )}

        {/* right */}
        <div>
          {currentPath === "/menu" ? (
            <Button
              variant="main"
              size="icon"
              className="flex size-fit items-center rounded-full p-0"
            >
              <SearchIcon className="!size-8 text-white" />
            </Button>
          ) : (
            currentPath !== "/" && <div className="size-8"></div>
          )}
          {currentPath === "/" && (
            <Button
              variant="main"
              size="icon"
              className="flex size-fit items-center rounded-full p-0"
            >
              <UserIcon className="!size-8 text-white" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
