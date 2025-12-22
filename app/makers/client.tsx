"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function MakersClient() {
    const router = useRouter()
    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    router.push("/")
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [router])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="container flex flex-col items-center justify-center min-h-[80vh] py-16 px-4 max-w-2xl mx-auto space-y-12 relative"
        >
            <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
                이 페이지는 {timeLeft}초 뒤에 사라집니다
            </div>

            <div className="space-y-6 text-center">
                <span className="text-4xl">🧑‍💻</span>
                <h1 className="text-3xl font-bold tracking-tight">만든 사람 (Human)</h1>
                <p className="text-muted-foreground leading-relaxed italic">
                    "누가 여기까지 와서 볼지 모르겠지만,<br />작은 기록으로 남겨둡니다."
                </p>
            </div>

            <div className="prose prose-zinc dark:prose-invert mx-auto bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-full shadow-sm">
                <div className="space-y-6 text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    <p>
                        경남 양산에 사는 40대입니다. 나름대로 세상에 기여하기 위해 노력하지만 번번이 현실의 벽이 높음을 느끼며 살아왔습니다.
                    </p>
                    <p>
                        거기에 덧붙여 BRCA2 유전자 변이로 4번째의 암투병중이고도 하고요. 집에서도 할 수 있는 활동을 찾다가 AI를 활용한 <strong>바이브코딩</strong>을 시작했습니다.
                        몸이 움직일때는 현장에서, 숨을 골라야 할 때는 컴퓨터 앞에서 활동을 이어갑니다.
                    </p>
                    <p>
                        프로그래밍? 코딩? 하나도 모르지만 하나라도 무기를 더 장착하고 싶어 시작한 바이브코딩입니다.
                    </p>
                    <p className="font-semibold text-red-600 dark:text-red-400">
                        치료가 끝나면 동료들과 함께 &lt;경남 공익 디지털센터: 손에 잡히는 미래&gt;를 준비하고 있습니다.
                    </p>
                </div>
            </div>

            <div className="text-center space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold">🛠️ Tech Stack (with AI)</p>
                <p>Planning & Directing: Human (redoutk@gmail.com)</p>
                <p>Code Generation: Cursor, Antigravity</p>
            </div>
        </motion.div>
    )
}
