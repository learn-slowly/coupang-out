import type { Metadata } from "next"
import UnsubscribeClient from "./client"

export const metadata: Metadata = {
    title: "탈퇴 인증",
    description: "쿠팡 탈퇴 인증샷을 올리고 캠페인에 동참해주세요.",
}

export default function UnsubscribePage() {
    return <UnsubscribeClient />
}
