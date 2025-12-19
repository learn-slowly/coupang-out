import type { Metadata } from "next"
import WhyClient from "./client"

export const metadata: Metadata = {
    title: "왜 쿠팡아웃인가?",
    description: "쿠팡의 노동 문제, 개인정보 유출 등 핵심 문제점 팩트 체크.",
}

export default function WhyPage() {
    return <WhyClient />
}
