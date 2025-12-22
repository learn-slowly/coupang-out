"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ASSETS } from "../assets";
import { useRouter } from "next/navigation";

export default function Outro() {
  const router = useRouter();

  const handleContinue = () => {
    // Brute force "Turn off" effect
    document.documentElement.style.filter = "brightness(0)";
    document.documentElement.style.transition = "filter 1s ease-out";

    setTimeout(() => {
      alert("로켓의 그림자는 당신을 덮칠 것입니다.");
      // Reset and redirect
      document.documentElement.style.filter = "none";
      router.push("/");
    }, 1500);
  };

  return (
    <section className="h-screen relative bg-zinc-950 text-white flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Image
          src={ASSETS.OUTRO_BOX}
          alt="Hazard Box"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="z-10 container max-w-xl px-4 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-black text-red-600 uppercase tracking-tight">
            청구서가 도착했습니다
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed">
            노동 착취, 안전 불감증, 시장 교란, 개인정보 유출.<br />
            쿠팡이 야기한 모든 문제의 대가를 우리사회가 치루고 있습니다.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 pt-8">
          <Link href="/mission">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-white text-black font-bold text-lg rounded-lg shadow-lg hover:bg-zinc-200 transition-colors flex justify-center items-center cursor-pointer"
            >
              반품(탈퇴)하고 연대하기
            </motion.div>
          </Link>

          <Link href="/why">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-zinc-900 border border-zinc-700 text-white font-medium text-lg rounded-lg hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-colors flex justify-center items-center cursor-pointer"
            >
              더 알아보기
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
