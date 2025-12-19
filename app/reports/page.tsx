import type { Metadata } from "next"
import ReportsClient from "./client"

export const metadata: Metadata = {
    title: "피해 제보",
    description: "쿠팡 노동/갑질 피해 사례를 익명으로 제보해주세요.",
}

export default function ReportsPage() {
    return <ReportsClient />
}
