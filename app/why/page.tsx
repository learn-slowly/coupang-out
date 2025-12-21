import type { Metadata } from "next"
import WhyClient from "./client"

export const metadata: Metadata = {
    title: "왜 쿠팡아웃인가?",
    description: "쿠팡의 노동 문제, 개인정보 유출 등 핵심 문제점 팩트 체크.",
}

export default function WhyPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "왜 쿠팡아웃인가?",
                        "description": "쿠팡의 노동 문제, 개인정보 유출 등 핵심 문제점 팩트 체크.",
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://coupang-out.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Why",
                                    "item": "https://coupang-out.com/why"
                                }
                            ]
                        }
                    })
                }}
            />
            <WhyClient />
        </>
    )
}
