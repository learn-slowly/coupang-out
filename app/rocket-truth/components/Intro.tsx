"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ASSETS } from "../assets";

export default function Intro({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src={ASSETS.INTRO_BOX}
          alt="Delivery Box at Dawn"
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={ASSETS.INTRO_BOX}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="z-10 text-center space-y-8 max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
            로켓의 진실
          </h1>
          <p className="text-xl md:text-2xl font-light text-zinc-300">
            당신이 잠든 사이에 도착했습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="pt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isOpen ? { scale: 1.5, opacity: 0 } : {}}
            onClick={handleOpen}
            className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-full shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all"
          >
            {isOpen ? "진실을 마주하는 중..." : "진실 확인하기"}

            {/* Pulse Effect */}
            <span className="absolute inset-0 rounded-full ring-4 ring-red-600 ring-opacity-50 animate-ping" />
          </motion.button>
        </motion.div>
      </div>

      {/* Screen Blackout Transition */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-black z-50 flex items-center justify-center p-8"
        >
          <p className="text-zinc-400 text-center font-light text-lg">
            "이 편리함은 마법이 아닙니다...<br />
            누군가의 밤, 땀, 그리고 피로 만들어졌습니다."
          </p>
        </motion.div>
      )}
    </section>
  );
}
