"use client";

import UserIcon from "~icons/solar/user-circle-bold";
import LeftArrowIcon from "~icons/solar/alt-arrow-left-line-duotone";
import CloseIcon from "~icons/mdi/close";
import SearchIcon from "~icons/solar/magnifer-linear";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/shadcn-ui/button";
import { useLiff } from "@/components/shared/layout/liffProvider";
import { useAppDispatch } from "@/lib/hooks";
import { setUserId } from "@/lib/slice/userSlice";
import { setLoading } from "@/lib/slice/loadingSlice";
import { useEffect } from "react";

export function Header() {
  const router = useRouter();
  const currentPath = usePathname();
  const currentPathName = currentPath.split("/")[1];
  const { liff } = useLiff();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      if (!liff) {
        console.error("LIFF is not initialized");

        return;
      }

      if (liff.isLoggedIn()) {
        liff.logout();
        console.log("Logout success");
      } else {
        console.log("Already logged out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      router.push("/login");
    }
  };

  const renderLeftContent = () => {
    if (currentPath === "/") {
      return (
        <div className="flex flex-col">
          <span className="text-xs text-white">ようこそ</span>
          <p className="text-lg font-bold text-white">texttexttext</p>
        </div>
      );
    }

    if (currentPath === "") {
      return (
        <Button
          variant="main"
          size="icon"
          className="flex size-fit items-center rounded-full p-0"
          onClick={() => router.back()}
        >
          <CloseIcon className="!size-8 text-white" />
        </Button>
      );
    }

    if (currentPath !== "/setup" && currentPath !== "/login") {
      return (
        <Button
          variant="main"
          size="icon"
          className="flex size-fit items-center rounded-full p-0"
          onClick={() => router.back()}
        >
          <LeftArrowIcon className="!size-8 text-white" />
        </Button>
      );
    }

    return <div className="size-8"></div>;
  };

  const renderRightContent = () => {
    if (currentPath === "/menu") {
      return (
        <Button
          variant="main"
          size="icon"
          className="flex size-fit items-center rounded-full p-0"
        >
          <SearchIcon className="!size-8 text-white" />
        </Button>
      );
    }

    if (currentPath === "/") {
      return (
        <Button
          variant="main"
          size="icon"
          className="flex size-fit items-center rounded-full p-0"
          onClick={handleLogout}
        >
          <UserIcon className="!size-8 text-white" />
        </Button>
      );
    }

    return <div className="size-8"></div>;
  };

  useEffect(() => {
    if (liff && liff.isLoggedIn()) {
      liff
        .getProfile()
        .then((profile) => {
          const userId = profile.userId;
          dispatch(setUserId(Number(userId)));
          console.log("User ID set:", userId);
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 1000);
        })
        .catch((err) => {
          console.error("Error getting profile:", err);
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 1000);
        });
    } else {
      console.log("Not logged in");
      router.push("/login");
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    }
  }, [liff, dispatch, router]);

  return (
    <div className="bg-main p-4 w-full fixed top-0 left-0 right-0 z-50 min-h-[76px] flex items-center">
      <div className="flex items-center justify-between w-full h-full">
        {/* left */}
        <div>{renderLeftContent()}</div>

        {/* center */}
        {currentPath !== "/" && (
          <h1 className="text-lg font-bold text-white">
            {currentPathName.toUpperCase()}
          </h1>
        )}

        {/* right */}
        <div>{renderRightContent()}</div>
      </div>
    </div>
  );
}
