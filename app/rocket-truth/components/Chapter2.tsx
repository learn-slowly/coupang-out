"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ASSETS } from "../assets";

export default function Chapter2() {
  const containerRef = useRef(null);
  const [stamped, setStamped] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="min-h-[150vh] relative bg-zinc-950 text-white flex items-center justify-center">
      {/* Dynamic Red Overlay */}
      <motion.div
        style={{ opacity: scrollYProgress }}
        className="absolute inset-0 bg-red-900/30 z-10 pointer-events-none mix-blend-overlay"
      />

      <div className="absolute inset-0 z-0">
        <Image
          src={ASSETS.FIRE}
          alt="Warehouse Fire"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      <div className="z-20 container max-w-3xl px-4 text-center space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-orange-500">제2장. 책임은 증발한다</h2>
          <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-light">
            축구장 15개 크기의 창고가 불탔습니다.<br />
            소방관은 돌아오지 못했습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="bg-white text-black p-8 rounded shadow-2xl max-w-lg mx-auto transform rotate-1 relative"
        >
          <h4 className="font-serif text-2xl font-bold mb-4 border-b pb-2 border-black">등기이사 사임서</h4>
          <p className="font-serif text-lg leading-loose text-left mb-8">
            본인은 일신상의 사유로... (중략) ...<br />
            이에 한국 법인 등기이사직을 사임합니다.
          </p>

          <div className="flex justify-end items-center gap-4">
            <span className="font-serif font-bold text-xl">의장 김범석</span>
            <div className="relative">
              <button
                onClick={() => setStamped(true)}
                className={`w-24 h-24 rounded-full border-4 border-dashed border-red-300 flex items-center justify-center text-red-300 hover:bg-red-50 transition-colors ${stamped ? 'opacity-0' : 'opacity-100'}`}
              >
                서명하기
              </button>

              {stamped && (
                <motion.div
                  initial={{ scale: 2, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: -15 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="absolute inset-0 -top-4 -left-4 w-32 h-32 border-[6px] border-red-600 rounded-full flex items-center justify-center text-red-600 font-black text-xl rotate-[-15deg] opacity-80"
                >
                  <div className="border-[3px] border-red-600 rounded-full w-28 h-28 flex items-center justify-center">
                    책임회피
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {!stamped && <p className="text-xs text-red-500 mt-4 absolute -bottom-8 left-0 w-full text-center animate-bounce">버튼을 눌러 사임서를 처리하세요</p>}
        </motion.div>

        {stamped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <p className="text-red-500 font-bold text-lg bg-black/50 p-4 rounded inline-block">
              불이 꺼지기도 전에, 책임자는 떠났습니다.
            </p>
            <a
              href="https://www.hankookilbo.com/News/Read/A2021062115310005585"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-all flex items-center gap-1"
            >
              관련 기사 보기: "중대재해법 피하려 꼼수?"
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
