"use client";

import { useAppSelector } from "@/lib/hooks";

export function Loading() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  return (
    isLoading && (
      <div className="flex flex-col gap-4 items-center justify-center w-screen h-screen fixed top-0 left-0 bg-white/95 backdrop-blur-sm z-[10000]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-main border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-[30%] bg-main rounded-full animate-pulse" />
        </div>
        <p className="text-xl font-bold text-main animate-pulse">
          loading
          <span className="inline-block animate-bounce delay-75">.</span>
          <span className="inline-block animate-bounce delay-150">.</span>
          <span className="inline-block animate-bounce delay-300">.</span>
        </p>
      </div>
    )
  );
}
