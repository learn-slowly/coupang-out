import type { Metadata } from "next"
import MissionClient from "./client"

export const metadata: Metadata = {
    title: "미션: 쿠팡아웃",
    description: "쿠팡 탈퇴 인증샷을 올리고 캠페인에 동참해주세요.",
}

export default function MissionPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "미션: 쿠팡아웃",
                        "description": "쿠팡 탈퇴 인증샷을 올리고 캠페인에 동참해주세요.",
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
                                    "name": "Mission",
                                    "item": "https://coupang-out.com/mission"
                                }
                            ]
                        }
                    })
                }}
            />
            <MissionClient />
        </>
    )
}
