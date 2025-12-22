import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "캠페인 소개",
    description: "쿠팡아웃 캠페인이 시작된 이유와 목표.",
}

export default function AboutPage() {
    return (
        <div className="container py-16 px-4 max-w-3xl mx-auto space-y-12">
            <div className="space-y-6 text-center">
                <h1 className="text-4xl font-bold tracking-tight">우리는 왜 멈춰야 하는가</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    편리함이라는 이름 뒤에 숨겨진<br className="md:hidden" /> 고통과 불공정을 이야기합니다.
                </p>
            </div>

            <div className="prose prose-lg dark:prose-invert mx-auto leading-loose">
                <p>
                    <span className="font-bold text-red-600">로켓배송은 혁신이었습니다.</span> 하지만 그 혁신이 누군가의 생명을 담보로 한다면, 그것은 재앙입니다.
                </p>
                <p>
                    2020년 이후 28명의 노동자가 과로와 사고로 사망했습니다. 국민 65%의 개인정보가 유출되었지만 책임지는 사람은 없습니다.
                    납품업체와 소상공인은 거대 플랫폼의 '갑질'에 신음하고 있습니다.
                </p>
                <hr className="my-8 border-muted" />
                <h3 className="font-bold text-xl mb-4">쿠팡아웃 캠페인의 목표</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>노동 존중:</strong> 죽지 않고 일할 수 있는 권리 보장</li>
                    <li><strong>정보 보호:</strong> 개인정보 유출에 대한 투명한 공개와 배상</li>
                    <li><strong>공정 상생:</strong> 입점 업체와의 불공정 거래 관행 철폐</li>
                </ul>
                <p className="mt-8">
                    우리의 목표는 기업을 망가뜨리는 것이 아닙니다. <br />
                    기업이 기업답게, <strong>윤리적이고 책임감 있게 행동하도록 만드는 것</strong>입니다.
                </p>
                <p className="font-bold text-center mt-12 text-xl">
                    당신의 작은 불편이<br />누군가의 생명을 구합니다.
                </p>
            </div>
        </div>
    )
}
