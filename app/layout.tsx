import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "쿠팡 탈퇴 캠페인 - 쿠팡의 진실을 마주하세요",
    template: "%s | 쿠팡 탈퇴 캠페인",
  },
  description: "노동자 죽음과 개인정보 유출, 더 이상 침묵할 수 없습니다. 쿠팡 탈퇴와 불매 운동에 동참해주세요.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://tal-pang.vercel.app", // Placeholder
    title: "쿠팡 탈퇴 캠페인 - 쿠팡의 진실을 마주하세요",
    description: "25명의 죽음, 3,370만 개인정보 유출. 소비자의 힘으로 변화를 만듭니다.",
    siteName: "쿠팡 탈퇴 캠페인",
  },
  twitter: {
    card: "summary_large_image",
    title: "쿠팡 탈퇴 캠페인",
    description: "25명의 죽음, 3,370만 개인정보 유출. 더 이상 침묵할 수 없습니다.",
  },
};

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
