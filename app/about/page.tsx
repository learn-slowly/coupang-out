import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "소개",
    description: "쿠팡 탈퇴 캠페인이 시작된 이유와 누리는 목표.",
}

export default function AboutPage() {
    return (
        <div className="container py-12 px-4 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">캠페인 소개</h1>
                <p className="text-muted-foreground text-lg">
                    왜 우리는 쿠팡을 떠나는가?
                </p>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                    편리함이라는 이름 아래 가려진 누군가의 고통을 우리는 더 이상 외면할 수 없습니다.
                    빠른 배송 뒤에는 누군가의 쉴 틈 없는 노동이, 저렴한 가격 뒤에는 누군가의 희생이 있습니다.
                </p>
                <p>
                    쿠팡 탈퇴 캠페인은 단순히 특정 기업을 비난하기 위함이 아닙니다.
                    우리는 기업이 노동자의 안전을 최우선으로 생각하고,
                    소비자의 개인정보를 소중히 다루며,
                    입점 업체와 공정하게 상생하는 건강한 시장을 원합니다.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
                <Card>
                    <CardContent className="pt-6 font-bold text-center">
                        노동자의 생명 존중
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 font-bold text-center">
                        개인정보 보호 강화
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 font-bold text-center">
                        공정한 시장 질서
                    </CardContent>
                </Card>
            </div>

            <div className="bg-muted p-6 rounded-lg mt-12 text-center text-sm">
                <p>
                    이 캠페인은 자발적인 시민들의 참여로 운영되며, <br />
                    어떠한 영리적 목적도 추구하지 않습니다.
                </p>
            </div>
        </div>
    )
}
