"use client";

import { useState } from "react";
import Intro from "./components/Intro";
import Chapter1 from "./components/Chapter1";
import Chapter2 from "./components/Chapter2";
import Chapter3 from "./components/Chapter3";
import Chapter4 from "./components/Chapter4";
import Outro from "./components/Outro";

export default function RocketTruthPage() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-red-900 selection:text-white">
      {!started ? (
        <Intro onOpen={() => setStarted(true)} />
      ) : (
        <div className="animate-in fade-in duration-1000">
          <Chapter1 />
          <Chapter2 />
          <Chapter3 />
          <Chapter4 />
          <Outro />
        </div>
      )}
    </main>
  );
}
