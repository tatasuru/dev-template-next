"use client";

import { useState, useEffect } from "react";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn-ui/button";
import { useLiff } from "@/components/shared/layout/liffProvider";
import { useToast } from "@/hooks/use-toast";
import LoadingIcon from "~icons/line-md/loading-twotone-loop";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { liff, liffError } = useLiff();

  useEffect(() => {
    // ユーザーがすでにログインしている場合はリダイレクト
    if (liff?.isLoggedIn()) {
      console.log("Already logged in");
      router.push("/");
    }
  }, [liff, router]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (liff) {
        liff.login();
      } else {
        // LIFFが初期化されていない場合のエラーハンドリング
        toast({
          variant: "destructive",
          title: "エラー",
          description:
            "LINEログインの初期化に失敗しました。再度お試しください。",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "エラー",
        description: "ログイン中にエラーが発生しました。",
      });
      setIsLoading(false);
    }
  };

  if (liffError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <div className="text-red-500 mb-4">
          LINEログインの初期化に失敗しました。
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          再読み込み
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">ログイン</h1>
          <p className="mt-2 text-gray-600">
            サービスを利用するには、
            <br />
            LINEでログインしてください。
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            variant="main"
            size="lg"
            className="w-full flex items-center justify-center"
            onClick={handleLogin}
            disabled={isLoading || !liff}
          >
            {isLoading ? (
              <LoadingIcon className="!size-6 animate-spin" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  fill="currentColor"
                >
                  <path d="M22 10.6c0-4.1-4.1-7.5-9.2-7.5-5.1 0-9.2 3.4-9.2 7.5 0 3.7 3.3 6.8 7.8 7.4.3.1.7.2.8.5.1.2.1.6 0 .8l-.3.9c-.1.3-.4 1.1.9.6s6.4-3.8 8.7-6.4c1.6-1.8 1.5-3.6 1.5-3.8z" />
                </svg>
                LINEでログイン
              </>
            )}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500">
            ※ログインすることで、
            <br />
            利用規約とプライバシーポリシーに
            <br />
            同意したことになります。
          </p>
        </div>
      </div>
    </div>
  );
}
