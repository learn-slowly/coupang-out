import type { Metadata } from "next"
import MakersClient from "./client"

export const metadata: Metadata = {
    title: "만든 사람들",
    description: "쿠팡아웃 캠페인을 만든 사람들.",
    robots: {
        index: false,
        follow: false,
    }
}

export default function MakersPage() {
    return <MakersClient />
}
