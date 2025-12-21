"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Share2, RefreshCw } from "lucide-react"

export default function Outro() {
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        alert("링크가 복사되었습니다. 널리 알려주세요!")
    }

    const handleRestart = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-start pt-32 md:justify-center md:pt-0 relative bg-zinc-950 text-white border-t border-zinc-900">
            <div className="text-center space-y-8 px-4 z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-3xl md:text-5xl font-bold"
                >
                    우리가 잃어버린 것은<br />
                    단순한 숫자가 아닙니다.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-zinc-400 text-lg max-w-xl mx-auto"
                >
                    이 이야기를 기억하고, 공유함으로써<br />
                    우리는 다시 연결될 수 있습니다.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex gap-4 justify-center pt-4"
                >
                    <Button
                        size="lg"
                        className="bg-white text-black hover:bg-zinc-200 font-bold gap-2"
                        onClick={handleShare}
                    >
                        <Share2 className="w-4 h-4" /> 이야기 공유하기
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-zinc-700 text-white hover:bg-zinc-900 hover:text-white gap-2"
                        onClick={handleRestart}
                    >
                        <RefreshCw className="w-4 h-4" /> 다시 보기
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
