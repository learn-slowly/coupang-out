"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Story } from "../data"
import CountUp from "react-countup"
import StoryBlacklist from "./story-blacklist"
import StoryParticles from "./story-particles"

export default function StorySection({ story, index }: { story: Story; index: number }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const inViewRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(inViewRef, { margin: "-20% 0px -20% 0px", once: false })

    // Background selection
    const renderBackground = () => {
        switch (story.theme) {
            case "blacklist":
                return <StoryBlacklist />
            case "data-leak":
                return <StoryParticles />
            case "overwork":
                return (
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/20 to-zinc-950 opacity-50" />
                )
            default:
                return (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-950 to-zinc-950" />
                )
        }
    }

    return (
        <section
            ref={containerRef}
            className="h-[100dvh] w-full relative flex items-start pt-24 md:items-center md:justify-center md:pt-0 sticky top-0 overflow-hidden border-t border-zinc-900 bg-zinc-950 snap-start"
        >
            {renderBackground()}

            <div className="container px-4 z-10 grid md:grid-cols-2 gap-12 items-center" ref={inViewRef}>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-2 text-red-500 font-mono text-sm tracking-wider">
                        <span>EPISODE 0{index + 1}</span>
                        <div className="h-[1px] w-12 bg-red-500/50" />
                        <span className="text-zinc-400">{story.character}</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black leading-tight text-white/90">
                        {story.title}
                    </h2>
                    <h3 className="text-xl md:text-2xl text-zinc-400 font-light">
                        {story.subtitle}
                    </h3>

                    <p className="text-lg md:text-xl leading-relaxed text-zinc-300/80 max-w-lg">
                        {story.content}
                    </p>

                    <div className="pt-8 border-l-2 border-red-600 pl-6">
                        <p className="text-lg font-medium text-white italic">
                            "{story.highlight}"
                        </p>
                    </div>
                </motion.div>

                {/* Stat Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col items-center md:items-end justify-center text-center md:text-right"
                >
                    <span className="text-zinc-500 mb-2 font-medium tracking-wide text-sm md:text-base">
                        {story.stat.label}
                    </span>
                    <div className="text-6xl md:text-8xl font-black text-white tracking-tighter tabular-nums">
                        {isInView && (
                            <CountUp
                                end={story.stat.value}
                                duration={2.5}
                                separator=","
                                suffix={story.stat.unit === '%' ? '%' : ''}
                            />
                        )}
                        {!isInView && <span>0</span>}
                        {story.stat.unit !== '%' && <span className="text-4xl md:text-5xl ml-1 text-zinc-600">{story.stat.unit}</span>}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
