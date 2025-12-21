"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ASSETS } from "../assets";
import { ExternalLink } from "lucide-react";

// 데이터 출처: 공공운수노조, 언론 보도 (2020~2025)
// 각 사건별 실제 기사 링크 매핑 완료
const DEATH_CASES = [
  { year: "2020.03", title: "안산1캠프 (경기 안산)", cause: "새벽배송 중 사망 (40대)", link: "http://www.ansansm.co.kr/news/articleView.html?idxno=39865" },
  { year: "2020.05", title: "인천 물류센터 (인천 서구)", cause: "화장실서 쓰러져 사망 (40대)", link: "https://www.yna.co.kr/view/AKR20200528161500065" },
  { year: "2020.06", title: "천안 물류센터", cause: "조리실 근무 중 쓰러짐", link: "https://www.epnnews.com/news/articleView.html?idxno=5012" },
  { year: "2020.10", title: "칠곡 물류센터 (경북 칠곡)", cause: "장덕준(27) 야간노동 과로사", link: "https://www.yna.co.kr/view/AKR20230328125051004" },
  { year: "2021.01", title: "동탄물류센터 (경기 화성)", cause: "50대 여성(최경애) 한파 속 사망", link: "https://www.hani.co.kr/arti/society/society_general/979504.html" },
  { year: "2021.03", title: "구로 배송캠프 (서울 구로)", cause: "캠프리더(40대) 과로사", link: "https://www.khan.co.kr/article/202103081624001" },
  { year: "2021.03", title: "송파1캠프 (서울 송파)", cause: "심야 배송 후 고시원 사망(48세)", link: "https://www.seoul.co.kr/news/world/event/2021/03/09/20210309009025" },
  { year: "2021.06", title: "덕평 물류센터 (화성 덕평)", cause: "화재 진압 김동식 구조대장 순직", link: "https://www.hankookilbo.com/News/Read/A2021062110410002602" },
  { year: "2021.08", title: "안성", cause: "배송기사(50대) 뇌졸중/심근경색", link: "https://www.labortoday.co.kr/news/articleView.html?idxno=231137" },
  { year: "2022.02", title: "동탄 물류센터", cause: "50대 여성 노동자 뇌출혈", link: "https://news.jtbc.co.kr/article/NB12048152" },
  { year: "2023.01", title: "인천 물류센터", cause: "60대 노동자 심정지", link: "https://www.hankookilbo.com/News/Read/A2023010810240005864" },
  { year: "2023.10", title: "군포", cause: "퀵플렉스(60대) 새벽배송 중 사망", link: "https://www.hani.co.kr/arti/society/labor/1111988.html" },
  { year: "2024.05", title: "남양주2캠프 (경기 남양주)", cause: "정슬기(41) 주63시간 과로사", link: "https://www.hani.co.kr/arti/society/labor/1146779.html" },
  { year: "2024.07", title: "제주 택배 분류", cause: "이동 중 사망", link: "https://hnews.kr/news/view.php?no=64492" },
  { year: "2024.08", title: "시흥 캠프", cause: "김명규(49) 과로사", link: "https://www.khan.co.kr/article/202412031302001/?utm_source=urlCopy&utm_medium=social&utm_campaign=sharing" },
  { year: "2025.03", title: "안성 물류센터 (경기 안성)", cause: "야간 일용직(50대) 작업 중 사망", link: "https://news.imbc.com/news/2025/society/article/6696039_36718.html" },
  { year: "2025.08", title: "용인 물류센터", cause: "50대 냉동창고 작업 중 사망", link: "https://www.newscham.net/articles/113881" },
  { year: "2025.10", title: "일산2캠프 (경기 일산)", cause: "새벽배송 후 뇌졸중 사망", link: "https://www.hani.co.kr/arti/society/labor/1232151.html" },
  { year: "2025.11", title: "제주1캠프 (제주)", cause: "배송기사 오승용(33) 과로사", link: "https://h21.hani.co.kr/arti/society/society_general/58349.html" },
  { year: "2025.11", title: "동탄1센터 (경기 화성)", cause: "야간 계약직(30대) 식당서 쓰러짐", link: "https://www.donga.com/news/Society/article/all/20251123/132822606/1" },
  { year: "2025.11", title: "경기광주5센터 (경기 광주)", cause: "새벽 피킹 업무 중 쓰러짐(50대)", link: "https://www.yna.co.kr/view/AKR20251126032300061" },
];
export default function Chapter1() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const uphCount = useTransform(scrollYProgress, [0, 0.5, 1], [100, 450, 800]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]); // Trigger earlier

  return (
    <section ref={containerRef} className="min-h-[250vh] relative bg-zinc-950 text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background Image */}
        <motion.div style={{ opacity }} className="absolute inset-0 z-0">
          <Image
            src={ASSETS.FACTORY_BELT}
            alt="Factory Assembly Line"
            fill
            className="object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-zinc-950" />
        </motion.div>

        {/* Content */}
        <div className="z-10 container max-w-full px-4 flex flex-col items-center text-center space-y-6 md:space-y-12">

          {/* UPH Counter Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-black/80 backdrop-blur border border-red-900/50 p-4 md:p-6 rounded-lg shadow-2xl z-20 mt-16 md:mt-0"
          >
            <h3 className="text-red-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-1 md:mb-2">Real-time UPH</h3>
            <div className="flex items-baseline justify-center gap-2">
              <Counter value={uphCount} />
              <span className="text-zinc-500 font-bold text-sm md:text-base">건/시간</span>
            </div>
            <p className="text-[10px] md:text-xs text-zinc-400 mt-1 md:mt-2">당신의 스크롤 속도가 곧 노동 강도입니다.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="bg-black/80 p-6 md:p-8 rounded-xl backdrop-blur-sm max-w-2xl relative z-20"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-red-100">제1장. 멈추지 않는 기계</h2>
            <p className="text-base md:text-xl leading-relaxed text-zinc-300">
              이곳에 '사람'은 없습니다. <br className="block md:hidden" />오직 '속도'만 있을 뿐입니다.<br /><br />
              우리는 기계 부품처럼 쓰이다,<br />
              고장 나면 조용히 교체되었습니다.
            </p>
          </motion.div>

          {/* Marquee Container - Full Width */}
          <div className="w-full overflow-hidden bg-red-950/20 py-6 md:py-12 border-y border-red-900/30 backdrop-blur-sm relative z-10 group">
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {[...DEATH_CASES, ...DEATH_CASES].map((item, i) => (
                <TimelineItem key={i} {...item} />
              ))}
            </div>
          </div>

          <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.2em] animate-pulse pb-4 md:pb-0">
            Scroll to continue the labor
          </p>

        </div>
      </div>

      {/* CSS for Marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite; /* Slower for readability */
        }
      `}</style>
    </section>
  );
}

function Counter({ value }: { value: any }) {
  const ref = useRef<HTMLSpanElement>(null);
  useTransform(value, (latest) => {
    if (ref.current) {
      ref.current.textContent = Math.round(latest as number).toString();
    }
  });

  return <span ref={ref} className="text-4xl md:text-6xl font-black text-red-600 font-mono tabular-nums" />
}

function TimelineItem({ year, title, cause, link }: { year: string, title: string, cause: string, link: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-4 flex-shrink-0 w-64 bg-zinc-900 border border-zinc-800 p-4 rounded hover:border-red-500 transition-all group block hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] cursor-pointer"
    >
      <div className="text-red-500 font-mono text-sm mb-1">{year}</div>
      <div className="font-bold text-lg mb-1 group-hover:text-red-100 flex items-center justify-between">
        {title}
        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="text-zinc-400 text-sm break-keep">{cause}</div>
    </a>
  )
}
