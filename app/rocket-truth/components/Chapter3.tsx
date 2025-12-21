"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ASSETS } from "../assets";

export default function Chapter3() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animations
  const spotlightX = useTransform(scrollYProgress, [0.2, 0.5], ["20%", "80%"]); // Spotlight moves from Original to Fake
  const originalOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0.3]); // Original fades out
  const fakeOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]); // Fake appears
  const winnerBadgeScale = useTransform(scrollYProgress, [0.5, 0.7], [0, 1.2]);

  return (
    <section ref={containerRef} className="min-h-[200vh] relative bg-zinc-950 text-white overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-20 md:justify-center md:pt-0">

        {/* Spotlight Effect */}
        <motion.div
          className="absolute top-0 w-[400px] h-[1000px] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl pointer-events-none z-10"
          style={{ left: spotlightX }}
        />

        {/* Content Container */}
        <div className="relative w-full max-w-5xl px-4 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center z-20">

          {/* The Original (Victim) */}
          <motion.div
            style={{ opacity: originalOpacity }}
            className="flex flex-col items-center space-y-2 md:space-y-4"
          >
            <div className="w-40 h-52 md:w-64 md:h-80 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center justify-center relative grayscale">
              {/* Placeholder for Product Image */}
              <span className="text-3xl md:text-4xl">🍎</span>
              <div className="absolute bottom-4 left-4 text-[10px] md:text-xs text-zinc-500 font-mono">
                ORIGINAL SELLER<br />
                Reviews: 5,420<br />
                Rating: 4.9
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-base md:text-xl font-bold text-zinc-400">당신의 '노력'</h3>
              <p className="text-[10px] md:text-sm text-zinc-600">5년간 쌓아온 신뢰와 리뷰</p>
            </div>
          </motion.div>

          {/* The Fake (PB / Winner) */}
          <motion.div
            style={{ opacity: fakeOpacity }}
            className="flex flex-col items-center space-y-2 md:space-y-4 relative"
          >
            <div className="w-40 h-52 md:w-64 md:h-80 bg-white rounded-lg border-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.5)] md:shadow-[0_0_100px_rgba(250,204,21,0.8)] flex items-center justify-center relative overflow-hidden">
              <span className="text-3xl md:text-4xl z-10">🍎</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100/50 via-white/80 to-yellow-100/50 z-0 animate-pulse" />

              {/* Winner Badge */}
              <motion.div
                style={{ scale: winnerBadgeScale }}
                className="absolute -top-3 -right-3 md:-top-6 md:-right-6 bg-yellow-400 text-black font-black px-2 py-1 md:px-4 md:py-2 text-[10px] md:text-base rounded-full shadow-lg border-2 border-white transform rotate-12 z-30"
              >
                ITEM WINNER
              </motion.div>

              <div className="absolute bottom-4 left-4 text-black font-mono font-bold z-20">
                <span className="text-lg md:text-2xl font-black tracking-tighter block mb-1">COUPANG PB</span>
                <span className="text-[10px] md:text-xs opacity-70">Reviews: 5,420 (Stolen)</span><br />
                <span className="text-[10px] md:text-xs opacity-70">Price: -10 KRW</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-base md:text-xl font-bold text-yellow-500">알고리즘의 '선택'</h3>
              <p className="text-[10px] md:text-sm text-zinc-400">단돈 10원 차이로 모든 걸 가져갑니다</p>
            </div>
          </motion.div>

        </div>

        {/* Text Overlay */}
        <motion.div
          className="relative mt-8 md:absolute md:bottom-20 md:mt-0 md:left-0 w-full text-center z-30 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-4">제3장. 언제나 쿠팡이 이긴다</h2>
          <p className="text-base md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            "빛은 주인의 물건만 비춥니다.<br className="block md:hidden" /> 리뷰도, 사진도, 고객도...<br />
            <a
              href="https://www.khan.co.kr/article/202505012047005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 font-bold hover:underline hover:text-yellow-400 transition-colors"
            >
              승자가 모두 가져갑니다.
            </a>"
          </p>
        </motion.div>

      </div>
    </section>
  );
}
