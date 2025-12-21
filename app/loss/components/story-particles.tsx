"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export default function StoryParticles() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Explosion effect - Fix hydration mismatch by generating on client
    const [particles, setParticles] = useState<Array<{ xSeed: number, ySeed: number }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 50 }).map(() => ({
            xSeed: (Math.random() - 0.5) * 200,
            ySeed: (Math.random() - 0.5) * 200
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {particles.map((p: { xSeed: number, ySeed: number }, i: number) => (
                <Particle
                    key={i}
                    progress={scrollYProgress}
                    xSeed={p.xSeed}
                    ySeed={p.ySeed}
                />
            ))}
        </div>
    )
}

function Particle({ progress, xSeed, ySeed }: { progress: any, xSeed: number, ySeed: number }) {
    const x = useTransform(progress, [0.4, 0.8], ["0%", `${xSeed}%`])
    const y = useTransform(progress, [0.4, 0.8], ["0%", `${ySeed}%`])
    const opacity = useTransform(progress, [0.4, 0.5, 0.8, 0.9], [0, 1, 1, 0])
    const scale = useTransform(progress, [0.4, 0.8], [0.5, 2])

    return (
        <motion.div
            style={{
                x,
                y,
                opacity,
                scale,
                left: "50%",
                top: "50%"
            }}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-red-600/60 blur-[1px]"
        />
    )
}
