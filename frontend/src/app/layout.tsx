import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/layout/header";
import { Toaster } from "@/components/shadcn-ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sandwich",
  description: "sandwich app for sandwich lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex items-center justify-center h-fit bg-gray-100">
          <div className="max-w-[550px] w-full h-fit">
            <Header />
            <div className="pt-[76px] min-h-screen w-full">{children}</div>
            <Toaster />
          </div>
        </div>
      </body>
    </html>
  );
}
