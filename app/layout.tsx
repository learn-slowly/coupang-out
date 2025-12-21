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
  metadataBase: new URL("https://coupang-out.com"),
  title: {
    default: "쿠팡아웃 - 25명의 죽음, 3,370만 개인정보 유출",
    template: "%s | 쿠팡아웃",
  },
  description: "쿠팡의 구조적 문제를 알리고 변화를 만드는 캠페인. 노동자 25명 사망, 3,370만 개인정보 유출. 더 이상 침묵하지 않겠습니다.",
  keywords: ["쿠팡", "쿠팡아웃", "노동자", "개인정보유출", "다크패턴", "블랙리스트", "물류센터", "과로사", "Coupang", "로켓배송"],
  authors: [{ name: "Coupang Out Campaign" }],
  creator: "Coupang Out Campaign",
  publisher: "Coupang Out Campaign",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://coupang-out.com",
  },
  verification: {
    google: [
      "GqAlJIRDMjMJHQ7TiqOMf-EtnTlxrHGedhfpISb_r4c",
      "9WLcXQPJV0TPGBIwp_J38WY5iTluu3MBvAzUgUJRR0c",
    ],
    other: {
      "naver-site-verification": [
        "f4b9f8baf25ed6a86f5f39c9f8469352061f4ac7",
        "f4841842cf3a544394c30b04b366fc9e623d8d79",
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://coupang-out.com",
    title: "쿠팡아웃 캠페인",
    description: "노동자 25명 사망, 3,370만 개인정보 유출. 더 이상 침묵하지 않겠습니다.",
    siteName: "쿠팡아웃",
    images: [{
      url: "/opengraph-image.png", // Make sure this file exists or update path
      width: 1200,
      height: 630,
      alt: "쿠팡아웃 캠페인",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "쿠팡아웃",
    description: "쿠팡의 진실을 알려주세요",
    creator: "@coupangout",
    images: ["/opengraph-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "쿠팡아웃 (Coupang Out)",
  "url": "https://coupang-out.com",
  "logo": "https://coupang-out.com/icon.png",
  "sameAs": [
    "https://twitter.com/coupangout",
    "https://instagram.com/coupangout"
  ],
  "description": "쿠팡의 노동 환경 개선과 소비자 권리 보호를 위한 캠페인"
}

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
