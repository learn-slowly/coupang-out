import { Metadata } from "next";
import RocketTruthClient from "./client";

export const metadata: Metadata = {
  title: "진실의 로켓 - 쿠팡의 실체 | 쿠팡아웃",
  description: "쿠팡이 숨기고 있는 진실을 낱낱이 파헤칩니다. 로켓배송의 이면, 노동자들의 현실을 확인하세요.",
  openGraph: {
    title: "진실의 로켓 - 쿠팡의 실체 | 쿠팡아웃",
    description: "쿠팡이 숨기고 있는 진실을 낱낱이 파헤칩니다. 로켓배송의 이면을 확인하세요.",
    type: "article",
    url: "https://coupang-out.com/rocket-truth",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "진실의 로켓 - 쿠팡의 실체 | 쿠팡아웃",
    description: "쿠팡이 숨기고 있는 진실을 낱낱이 파헤칩니다.",
  },
};

export default function RocketTruthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    "headline": "진실의 로켓 - 쿠팡의 실체",
    "description": "쿠팡의 노동 환경과 개인정보 유출 문제를 다룬 인터랙티브 다큐멘터리",
    "author": {
      "@type": "Organization",
      "name": "Coupang Out Campaign"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Coupang Out Campaign",
      "logo": {
        "@type": "ImageObject",
        "url": "https://coupang-out.com/icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://coupang-out.com/rocket-truth"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RocketTruthClient />
    </>
  );
}
