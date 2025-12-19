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
    default: "쿠팡아웃 - 25명의 죽음, 3,370만 개인정보 유출",
    template: "%s | 쿠팡아웃",
  },
  description: "쿠팡의 구조적 문제를 알리고 변화를 만드는 캠페인. 노동자 25명 사망, 3,370만 개인정보 유출. 더 이상 침묵하지 않겠습니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://coupang-out.com",
    title: "쿠팡아웃 캠페인",
    description: "노동자 25명 사망, 3,370만 개인정보 유출. 더 이상 침묵하지 않겠습니다.",
    siteName: "쿠팡아웃",
  },
  twitter: {
    card: "summary_large_image",
    title: "쿠팡아웃",
    description: "쿠팡의 진실을 알려주세요",
    creator: "@coupangout",
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
