"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function StoryBlacklist() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])
    const glitchX = useTransform(scrollYProgress, [0.3, 0.7], [0, 20])

    const rows = 15
    const cols = 8

    // Use deterministic randomness based on index to avoid hydration mismatch
    const getPseudoRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 flex flex-col gap-[1px] bg-zinc-900/50"
            >
                {Array.from({ length: rows }).map((_, r) => (
                    <div key={r} className="flex-1 flex gap-[1px]">
                        {Array.from({ length: cols }).map((_, c) => {
                            const seed = r * cols + c;
                            const rand1 = getPseudoRandom(seed);
                            const rand2 = getPseudoRandom(seed + 1000);

                            return (
                                <motion.div
                                    key={c}
                                    className="flex-1 bg-zinc-950/80 border border-emerald-900/10 relative overflow-hidden flex items-center justify-center"
                                    style={{
                                        x: rand1 > 0.8 ? glitchX : 0
                                    }}
                                >
                                    <span className="text-[10px] text-emerald-900/20 font-mono">
                                        {rand2 > 0.5 ? "REDACTED" : "user_id"}
                                    </span>
                                </motion.div>
                            )
                        })}
                    </div>
                ))}
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
        </div>
    )
}
