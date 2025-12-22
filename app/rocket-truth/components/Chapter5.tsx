"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ASSETS } from "../assets";

export default function Chapter5() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    return (
        <section ref={containerRef} className="min-h-screen relative bg-zinc-950 text-white flex items-center justify-center overflow-hidden py-24">

            {/* Background - Cold, dark office texture */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>
            </div>

            <div className="z-10 container max-w-4xl px-4 flex flex-col items-center space-y-16">

                {/* Title Section */}
                <div className="text-center space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter text-red-600"
                    >
                        제5장. CEO 지키기
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-zinc-400 text-lg md:text-xl font-light"
                    >
                        노동자의 죽음, 그 직후 내려진 지시
                    </motion.p>
                </div>

                {/* Content Section - Typewriter Effect for Quotes */}
                <div className="w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center">

                    {/* Left: The Incident */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-6 text-zinc-300 leading-relaxed"
                    >
                        <div className="border-l-2 border-zinc-700 pl-4 space-y-2">
                            <p className="font-bold text-white">2020년 10월, 칠곡물류센터<br /><span className="text-sm font-normal text-zinc-400">故 장덕준 씨 과로사 사건</span></p>
                        </div>
                        <p>
                            야간 근무를 마치고 돌아온 27살 청년이 욕조에서 숨진 채 발견되었습니다. 과로사였습니다.
                        </p>
                        <p>
                            모두가 비통해하던 그 시각, 경영진은 대책 회의를 열었습니다.<br />
                            그리고 믿기 힘든 지시가 내려옵니다.
                        </p>
                    </motion.div>

                    {/* Right: The Directive (Typewriter) */}
                    <div className="bg-black/50 border border-zinc-800 p-6 md:p-8 rounded-sm relative shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-900/50 to-transparent"></div>

                        <TypewriterQuote
                            text={`"열심히 일했다는 기록이\n남지 않도록 하라."\n\n"그가 왜 열심히 일하겠나?\n시간제인데.. 말이 안 된다."`}
                            trigger={isInView}
                        />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 4 }} // Wait for typing to finish roughly
                            className="mt-6 pt-6 border-t border-zinc-900 flex justify-between items-end"
                        >
                            <div>
                                <p className="text-xs text-zinc-500 font-mono mb-1">SOURCE</p>
                                <p className="text-sm font-bold text-zinc-400">당시 김범석 대표의 발언</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-red-900/40 font-black tracking-widest">CONFIDENTIAL</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Action / Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 5 }}
                    className="pt-8"
                >
                    <a
                        href="https://news.sbs.co.kr/news/endPage.do?news_id=N1008378382"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-6 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-900/50 rounded-full transition-all duration-300"
                    >
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        <span className="text-zinc-300 group-hover:text-white font-medium">SBS 단독 보도 영상 원문 보기</span>
                        <svg className="w-4 h-4 text-zinc-500 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}

function TypewriterQuote({ text, trigger }: { text: string, trigger: boolean }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (!trigger) return;

        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => text.slice(0, index));
            index++;
            if (index > text.length) {
                clearInterval(intervalId);
            }
        }, 80); // Typing speed

        return () => clearInterval(intervalId);
    }, [trigger, text]);

    return (
        <div className="font-serif text-xl md:text-2xl text-red-500 leading-relaxed italic min-h-[160px] whitespace-pre-wrap">
            {displayedText}
            <span className="animate-blink inline-block w-1 h-6 bg-red-500 ml-1 align-middle"></span>
        </div>
    )
}
