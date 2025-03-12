"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/shadcn-ui/button";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { Separator } from "@/components/shadcn-ui/separator";
import { useLiff } from "@/components/shared/layout/liffProvider";
import { useRouter } from "next/navigation";

type UserProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

const settingMenuItems = [
  {
    title: "クレジットカード情報",
    link: "/settings/credit-card",
    icon: "/icons/credit.svg",
  },
  {
    title: "注文履歴",
    link: "/settings/order-history",
    icon: "/icons/history.svg",
  },
  {
    title: "クーポン情報",
    link: "/settings/coupon",
    icon: "/icons/coupon.svg",
  },
  {
    title: "ヘルプ・サポート",
    link: "/settings/help",
    icon: "/icons/help.svg",
  },
  {
    title: "利用約款",
    link: "/settings/terms-of-service",
    icon: "/icons/document.svg",
  },
];

export default function Settings() {
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>();
  const { liff } = useLiff();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const logout = async () => {
    try {
      if (!liff) {
        console.error("LIFF is not initialized");
        return;
      }

      if (liff.isLoggedIn()) {
        liff.logout();
        console.log("Logout success");
        router.push("/login");
      } else {
        console.log("Already logged out");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    if (isMounted && liff) {
      console.log("Fetching user profile");
      liff
        .getProfile()
        .then((profile) => {
          setUserProfile(profile);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      return;
    }
  }, [liff, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const ProfileComponent =
    isMounted || !isLoading ? (
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={userProfile?.pictureUrl || "/icons/help.svg"}
            alt="User profile"
            width={144}
            height={144}
            className="rounded-full"
          />
          <p>{userProfile ? userProfile?.displayName : "unknown"}</p>
        </div>
        <Button
          variant="link"
          size="default"
          onClick={() => console.log("Edit profile")}
          className="text-main"
        >
          <Link href="/setup">編集する</Link>
        </Button>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-36 h-36 rounded-full" />
          <Skeleton className="w-36 h-6" />
        </div>
        <Button
          variant="link"
          size="default"
          onClick={() => console.log("Edit profile")}
          className="text-main"
        >
          編集する
        </Button>
      </div>
    );

  const rightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m9 5l6 7l-6 7"
      />
    </svg>
  );

  return (
    <div className="px-4 py-8 min-h-full h-fit grid gap-8">
      {ProfileComponent}
      <div className="flex flex-col">
        {settingMenuItems.map((item) => (
          <div key={item.title}>
            <Separator />
            <div className="py-4">
              <Button variant="link" size="default" className="w-full p-0">
                <Link
                  href={item.link}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={28}
                      height={28}
                    />
                    {item.title}
                  </div>
                  {rightIcon}
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center pb-8">
        <Button
          variant="ghost"
          size="default"
          className="text-destructive"
          onClick={() => logout()}
        >
          <Image src="/icons/logout.svg" alt="Logout" width={28} height={28} />
          ログアウト
        </Button>
      </div>
    </div>
  );
}
