import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { RecentActivities } from "@/components/recent-activities";
import { ParticipantCounter } from "@/components/participant-counter";
import { TwitterTimeline } from "@/components/twitter-timeline";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20 px-4 md:py-32">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
            쿠팡아웃
          </h1>
          <p className="text-xl md:text-3xl font-light opacity-90 max-w-2xl mx-auto leading-relaxed">
            28명의 죽음, 3,370만 개인정보 유출. <br className="hidden md:inline" />
            우리의 편리함이 누군가의 고통이 되어서는 안 됩니다.
          </p>
          <div className="pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Button asChild size="lg" variant="secondary" className="font-bold text-red-600 text-xl px-10 py-8 h-auto rounded-full shadow-lg hover:shadow-xl transition-all">
              <Link href="/why">문제점 자세히 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard
              number="10배"
              label="압도적 산재율"
              description="한국 평균 대비 (건설업 초과)"
            />
            <StatCard
              number="28명"
              label="사망 노동자 수"
              description="2020년 이후 과로사 및 사고"
            />
            <StatCard
              number="3,370만"
              label="개인정보 유출"
              description="국민 65%의 정보가 털렸습니다"
            />
            <StatCard
              number="72시간"
              label="살인적 노동 시간"
              description="심야 로켓배송을 위한 질주"
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          <h2 className="text-3xl font-bold text-center">지금 우리가 할 수 있는 일</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/mission" className="group block">
              <div className="h-full p-8 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-zinc-100 hover:border-red-200 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">미션: 쿠팡아웃</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 text-lg">
                  쿠팡 탈퇴 후, 쿠팡에게 전하고 싶은 한마디를 남겨주세요.<br />
                  <span className="text-red-600 font-semibold mt-2 inline-block">
                    <ParticipantCounter />
                  </span>
                </p>
              </div>
            </Link>

            <Link href="/why" className="group block">
              <div className="h-full p-8 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-zinc-100 hover:border-red-200 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-100 rounded-full text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">왜 쿠팡아웃인가?</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 text-lg">
                  우리가 분노해야 할 4가지 확실한 이유.<br />
                  <span className="text-muted-foreground font-medium mt-2 inline-block">팩트 체크 보러가기 &rarr;</span>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold">최근 참여 & 소식</h2>
              <p className="text-muted-foreground mt-1">캠페인의 최신 현황을 확인하세요.</p>
            </div>
            <Link href="/mission" className="text-sm font-semibold text-red-600 hover:underline">
              메시지 전체 보기 &rarr;
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Internal Mission Messages Preview (Re-using RecentActivities but modified? No, RecentActivities uses old logic. Let's keep Twitter on full width or split? 
                 User asked to replace "Recent Activities" with "Twitter Timeline". 
                 But also we just built a Message Board. It might be good to show BOTH or just Twitter.
                 The request was "Replace Recent Activities with Twitter". 
                 Let's stick to the request: Replace "Recent Activities" section content with Twitter. 
             */}
            <div className="md:col-span-2">
              <TwitterTimeline />
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "쿠팡아웃 (Coupang Out)",
            "url": "https://coupang-out.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://coupang-out.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </div>
  );
}

function StatCard({ number, label, description }: { number: string; label: string; description: string }) {
  return (
    <Card className="text-center border-none shadow-none bg-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-4xl md:text-5xl font-black text-red-600 mb-0 tracking-tight">{number}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-lg mb-1">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
