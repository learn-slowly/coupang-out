"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ASSETS } from "../assets";

export default function Chapter4() {
  return (
    <section className="min-h-[150vh] relative bg-black text-white flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Image
          src={ASSETS.GLITCH_PHONE}
          alt="Data Leak Glitch"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="z-10 container max-w-2xl px-4 flex flex-col items-center space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-red-600 glitch-text">제4장. 뚫린 성벽</h2>
          <p className="text-lg text-zinc-300">
            <a
              href="https://news.kbs.co.kr/news/pc/view/view.do?ncd=8420654"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold hover:underline hover:text-red-400 transition-colors"
            >
              3,370만 명의 정보가 유출되었습니다.
            </a><br />
            탈퇴하고 싶으신가요?
          </p>
        </div>

        {/* Dark Pattern Game */}
        <DarkPatternGame />

        <div className="bg-red-950/50 border border-red-800 p-4 rounded text-sm text-red-200 text-center max-w-md">
          <p>"해지 버튼을 찾으셨나요? 실제로는 더 복잡합니다.<br />그들은 당신이 길을 잃도록 설계했습니다."</p>
        </div>
      </div>
    </section>
  );
}

function DarkPatternGame() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [showFakeDialog, setShowFakeDialog] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const moveButton = () => {
    if (isCancelled) return;
    setAttempts(prev => prev + 1);

    // Random position within a range
    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setPosition({ x: newX, y: newY });

    if (attempts === 2) {
      setShowFakeDialog(true);
    }
  };

  if (isCancelled) {
    return (
      <div className="w-full h-64 bg-black border-2 border-green-500 rounded-xl flex items-center justify-center flex-col gap-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
        <h3 className="text-2xl font-bold text-green-500">탈퇴 성공...?</h3>
        <p className="text-zinc-400 text-center text-sm px-8">
          축하합니다. 하지만 당신의 개인정보는<br />이미 어딘가에 남아있을지 모릅니다.
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-80 bg-zinc-900 rounded-xl border-4 border-zinc-800 overflow-hidden shadow-2xl flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      {showFakeDialog ? (
        <div className="bg-white text-black p-6 rounded-lg shadow-xl z-20 max-w-[80%] text-center space-y-4 animate-in zoom-in duration-300">
          <h4 className="font-bold text-lg">정말 혜택을 포기하시겠습니까?</h4>
          <p className="text-sm text-zinc-600">지금 유지하면 2,000 캐시를 드립니다!</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => setShowFakeDialog(false)} className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">혜택 받고 유지하기</button>
            <button onClick={() => setIsCancelled(true)} className="px-4 py-2 bg-zinc-200 text-zinc-600 rounded text-xs hover:bg-zinc-300">싫어요</button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-8 z-10 w-full flex flex-col items-center">
          <h3 className="text-xl font-bold">멤버십 해지</h3>

          <motion.button
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onHoverStart={moveButton}
            onClick={moveButton}
            className="px-6 py-3 bg-zinc-800 border border-zinc-600 rounded text-zinc-400 font-medium hover:text-white hover:border-white transition-colors"
          >
            해지하기
          </motion.button>

          <p className="text-xs text-zinc-600">
            {attempts > 0 ? `시도 횟수: ${attempts}회... 쉽지 않죠?` : "버튼을 눌러보세요"}
          </p>
        </div>
      )}
    </div>
  )
}
