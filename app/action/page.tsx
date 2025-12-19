import Link from "next/link"
import { ExternalLink, ShoppingCart, Gavel, Share2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "행동하기",
    description: "대안 서비스 이용, 서명 운동 참여 등 우리가 할 수 있는 행동들.",
}

export default function ActionPage() {
    return (
        <div className="container py-12 px-4 max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">행동하기</h1>
                <p className="text-lg text-muted-foreground">
                    쿠팡 없는 삶, 어렵지 않습니다. 더 나은 세상을 위한 작은 실천을 시작해보세요.
                </p>
            </div>

            {/* Alternative Services */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ShoppingCart className="text-red-600" />
                    대안 서비스 찾기
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AlternativeCard
                        title="마켓컬리"
                        description="새벽배송의 원조, 지속가능한 유통을 지향합니다."
                        tags={["신선식품", "새벽배송"]}
                        link="https://www.kurly.com"
                    />
                    <AlternativeCard
                        title="네이버 장보기"
                        description="동네 시장과 마트를 연결하여 상생합니다."
                        tags={["상생", "다양성"]}
                        link="https://shopping.naver.com/market/home"
                    />
                    <AlternativeCard
                        title="오아시스마켓"
                        description="생협 기반의 믿을 수 있는 유기농 마켓."
                        tags={["유기농", "합리적가격"]}
                        link="https://www.oasis.co.kr"
                    />
                    {/* Add more as needed */}
                </div>
            </section>

            {/* Legal Action */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Gavel className="text-blue-600" />
                    법적 대응 및 청원
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>공정위 과징금 촉구 서명</CardTitle>
                            <CardDescription>알고리즘 조작 등 불공정 행위에 대한 엄중한 처벌을 요구합니다.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <a href="#" target="_blank">서명 참여하기 <ExternalLink className="ml-2 h-4 w-4" /></a>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>집단 소송 참여</CardTitle>
                            <CardDescription>개인정보 유출 피해자 집단 소송에 동참하세요.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="secondary" className="w-full">
                                <a href="#" target="_blank">소송 안내 보기 <ExternalLink className="ml-2 h-4 w-4" /></a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Social Action */}
            <section className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl space-y-6 text-center">
                <div className="flex justify-center">
                    <Share2 className="w-12 h-12 text-green-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">SNS 챌린지</h2>
                    <p className="text-muted-foreground mt-2">
                        해시태그와 함께 탈퇴 인증샷을 공유해주세요.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    <span className="bg-white dark:bg-black px-3 py-1 rounded-full text-sm font-bold border">#쿠팡탈퇴</span>
                    <span className="bg-white dark:bg-black px-3 py-1 rounded-full text-sm font-bold border">#쿠팡없는삶</span>
                    <span className="bg-white dark:bg-black px-3 py-1 rounded-full text-sm font-bold border">#노동건강권</span>
                </div>
                <div className="pt-4">
                    <Button size="lg" variant="outline">
                        이미지 팩 다운로드
                    </Button>
                </div>
            </section>

            {/* Support */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Users className="text-orange-600" />
                    연대하기
                </h2>
                <Card>
                    <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
                        <div>
                            <h3 className="font-bold text-lg">공공운수노조 쿠팡지부 후원</h3>
                            <p className="text-muted-foreground">노동자들의 권리 찾기 투쟁을 후원해주세요.</p>
                        </div>
                        <Button>후원 계좌 보기</Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}

function AlternativeCard({ title, description, tags, link }: { title: string, description: string, tags: string[], link: string }) {
    return (
        <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-md">{tag}</span>
                    ))}
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        바로가기 <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                </Button>
            </CardContent>
        </Card>
    )
}
