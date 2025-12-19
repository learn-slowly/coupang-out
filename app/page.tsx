import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Share2, AlertTriangle, UserX, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20 px-4 md:py-32">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            쿠팡의 진실을 마주하세요
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
            25명의 죽음, 3,370만 건의 개인정보 유출. <br className="hidden md:inline" />
            우리의 편리함 뒤에 가려진 노동자들의 고통을 외면하지 말아주세요.
          </p>
          <div className="pt-8">
            <Button asChild size="lg" variant="secondary" className="font-bold text-red-600 text-lg px-8 py-6 h-auto">
              <Link href="/issues">문제점 자세히 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              number="10배"
              label="한국 평균 대비 산재율"
              description="건설업보다도 높은 수치"
            />
            <StatCard
              number="25명"
              label="과로사 및 사고 사망자"
              description="2020년 이후 누적 사망"
            />
            <StatCard
              number="3,370만"
              label="개인정보 무단 유출"
              description="국민 65% 해당 초대형 사고"
            />
            <StatCard
              number="72시간"
              label="주당 실제 노동 시간"
              description="하루 12시간 × 주 6일"
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-12">
          <h2 className="text-3xl font-bold">지금 우리가 할 수 있는 일</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard
              href="/unsubscribe"
              icon={<UserX className="w-10 h-10 mb-4 text-red-600" />}
              title="탈퇴 인증하기"
              description="쿠팡 탈퇴로 의지를 보여주세요"
            />
            <ActionCard
              href="/reports"
              icon={<AlertTriangle className="w-10 h-10 mb-4 text-orange-500" />}
              title="피해 제보하기"
              description="여러분의 목소리가 필요합니다"
            />
            <div className="flex flex-col items-center p-6 bg-white dark:bg-zinc-800 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <Share2 className="w-10 h-10 mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">공유하기</h3>
              <p className="text-muted-foreground mb-6">진실을 널리 알려주세요</p>
              <Button variant="outline" className="w-full">
                SNS 공유하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold">최근 참여 현황</h2>
            <Link href="/unsubscribe" className="text-sm text-muted-foreground hover:underline">
              더 보기 &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mock/Skeleton for now */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square bg-muted animate-pulse" />
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ number, label, description }: { number: string; label: string; description: string }) {
  return (
    <Card className="text-center border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-4xl md:text-5xl font-extrabold text-red-600 mb-2">{number}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-lg mb-1">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ActionCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link href={href} className="flex flex-col items-center p-6 bg-white dark:bg-zinc-800 rounded-xl border shadow-sm hover:shadow-md transition-shadow hover:border-red-200 block">
      {icon}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  );
}
