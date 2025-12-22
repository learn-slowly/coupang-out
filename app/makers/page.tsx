
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "만든 사람들",
    description: "쿠팡아웃 캠페인을 만든 사람들.",
    robots: {
        index: false,
        follow: false,
    }
}

export default function MakersPage() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-[80vh] py-16 px-4 max-w-2xl mx-auto space-y-12">
            <div className="space-y-6 text-center">
                <span className="text-4xl">🧑‍💻</span>
                <h1 className="text-3xl font-bold tracking-tight">만든 사람 (Human)</h1>
                <p className="text-muted-foreground leading-relaxed italic">
                    "누가 여기까지 와서 볼지 모르겠지만,<br />작은 기록으로 남겨둡니다."
                </p>
            </div>

            <div className="prose prose-zinc dark:prose-invert mx-auto bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-full shadow-sm">
                <ul className="space-y-4 list-none pl-0 m-0">
                    <li className="flex items-start gap-3">
                        <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                        <span>경남 양산에 사는 40대입니다.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                        <span>투병 생활 중, AI를 만나 <strong>바이브 코딩(Vibe Coding)</strong>을 시작했습니다.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                        <span>코딩은 모르지만, <strong>기술로 사회에 목소리를 내는 법</strong>을 배웠습니다.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                        <span>치료가 끝나면 <strong>&lt;경남 공익 디지털센터: 손에 잡히는 미래&gt;</strong>를 열고, 더 많은 이들과 이 경험을 나눌 예정입니다.</span>
                    </li>
                </ul>
            </div>

            <div className="text-center space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold">🛠️ Tech Stack (with AI)</p>
                <p>Planning & Directing: Human (redoutk@gmail.com)</p>
                <p>Code Generation: Cursor, Antigravity</p>
            </div>
        </div>
    )
}
