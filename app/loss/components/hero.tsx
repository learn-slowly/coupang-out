"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function Hero() {
    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-start pt-32 md:justify-center md:pt-0 relative bg-zinc-950 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950 z-0" />

            <div className="z-10 text-center space-y-6 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full border border-zinc-700 bg-zinc-900/50 text-zinc-400 text-sm mb-4">
                        Interactive Documentary
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-black tracking-tighter leading-tight"
                >
                    편리함의 이면:
                    <br />
                    <span className="text-red-600">클릭의 비용</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                >
                    쿠팡이 혁신이라 부르는 속도 뒤에는<br className="hidden md:block" />
                    누군가의 <span className="text-white font-bold">삶, 권리, 그리고 안전</span>이 지워지고 있습니다.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-12 z-10 text-zinc-500 flex flex-col items-center gap-2"
            >
                <span className="text-xs tracking-widest uppercase">Scroll to Explore</span>
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </section>
    )
}
