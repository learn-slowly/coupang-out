import type { Metadata } from "next"
import MissionClient from "./client"

export const metadata: Metadata = {
    title: "미션: 쿠팡아웃",
    description: "쿠팡 탈퇴 인증샷을 올리고 캠페인에 동참해주세요.",
}

export default function MissionPage() {
    return <MissionClient />
}
