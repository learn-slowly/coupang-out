"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Share2, RefreshCw, Twitter, Link as LinkIcon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Script from "next/script"
import { toast } from "sonner"

declare global {
    interface Window {
        Kakao: any;
    }
}

export default function Outro() {

    const handleRestart = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-start pt-32 md:justify-center md:pt-0 relative bg-zinc-950 text-white border-t border-zinc-900">
            <Script
                src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
                strategy="afterInteractive"
                onLoad={() => {
                    // SDK Load Success
                    if (window.Kakao && !window.Kakao.isInitialized()) {
                        try {
                            window.Kakao.init('22045de684de335a6e0ac79accb0b638');
                        } catch (e) {
                            console.error("Kakao Init Error:", e);
                        }
                    }
                }}
            />

            <div className="text-center space-y-8 px-4 z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-3xl md:text-5xl font-bold"
                >
                    우리가 잃어버린 것은<br />
                    단순한 숫자가 아닙니다.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-zinc-400 text-lg max-w-xl mx-auto"
                >
                    이 이야기를 기억하고, 공유함으로써<br />
                    우리는 다시 연결될 수 있습니다.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex gap-4 justify-center pt-4"
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-zinc-200 font-bold gap-2"
                            >
                                <Share2 className="w-4 h-4" /> 이야기 공유하기
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>공유하기</DialogTitle>
                                <DialogDescription>
                                    진실을 널리 알려주세요. 작은 공유가 큰 변화를 만듭니다.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col gap-3 py-4">
                                {/* 1. KakaoTalk (Yellow) */}
                                <Button
                                    className="w-full h-12 bg-[#FAE100] hover:bg-[#FADB00] text-[#371D1E] font-bold gap-2 text-base"
                                    onClick={() => {
                                        if (!window.Kakao) {
                                            alert("카카오톡 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
                                            return;
                                        }
                                        if (!window.Kakao.isInitialized()) {
                                            window.Kakao.init('22045de684de335a6e0ac79accb0b638');
                                        }
                                        try {
                                            window.Kakao.Share.sendScrap({
                                                requestUrl: window.location.href,
                                            });
                                        } catch (err) {
                                            console.error("Share Error:", err);
                                            alert("공유하기 도중 오류가 발생했습니다.");
                                        }
                                    }}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.123.49.178.483.376.351.274-.18 4.217-2.857 4.908-3.325.395.056.8.087 1.226.087 4.97 0 9-3.186 9-7.116C21 6.185 16.97 3 12 3z" />
                                    </svg>
                                    카카오톡으로 공유하기
                                </Button>

                                {/* 2. X (Twitter) (Sky Blue) */}
                                <Button
                                    className="w-full h-12 bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-200 font-bold gap-2 text-base"
                                    onClick={() => {
                                        const text = "쿠팡이 우리에게서 가져간 것들 #쿠팡아웃";
                                        const url = window.location.href;
                                        const appUrl = `twitter://post?message=${encodeURIComponent(text + " " + url)}`;
                                        const webUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " " + url)}`;

                                        const start = new Date().getTime();
                                        window.location.href = appUrl;
                                        setTimeout(() => {
                                            if (new Date().getTime() - start < 2000) {
                                                window.open(webUrl, '_blank');
                                            }
                                        }, 500);
                                    }}>
                                    <Twitter className="h-5 w-5" />
                                    X (Twitter)로 공유하기
                                </Button>

                                {/* 3. System Share (Gray) */}
                                <Button
                                    className="w-full h-12 bg-zinc-100 dark:bg-zinc-800 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700 font-bold gap-2 text-base"
                                    onClick={async () => {
                                        try {
                                            if (navigator.share) {
                                                await navigator.share({
                                                    title: "쿠팡이 우리에게서 가져간 것들",
                                                    text: "우리가 잃어버린 가치들을 되돌아보는 인터랙티브 다큐멘터리",
                                                    url: window.location.href,
                                                });
                                            } else {
                                                throw new Error("API not supported");
                                            }
                                        } catch (err) {
                                            // Fallback to copy link
                                            if ((err as Error).name !== 'AbortError') {
                                                navigator.clipboard.writeText(window.location.href);
                                                try {
                                                    toast.success("링크가 복사되었습니다.", {
                                                        description: "기기에서 시스템 공유를 지원하지 않아 링크를 복사했습니다."
                                                    });
                                                } catch {
                                                    alert("링크가 복사되었습니다.");
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <Share2 className="w-5 h-5" />
                                    더 많은 앱으로 공유하기
                                </Button>

                                {/* 4. Copy Link (White) */}
                                <Button
                                    variant="outline"
                                    className="w-full h-12 font-bold gap-2 text-base text-zinc-900 border-zinc-300"
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        // Use sonner toast if available, otherwise alert
                                        try {
                                            toast.success("링크가 복사되었습니다.");
                                        } catch {
                                            alert("링크가 복사되었습니다.");
                                        }
                                    }}
                                >
                                    <LinkIcon className="h-5 w-5" />
                                    링크 복사하기
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-zinc-700 text-white hover:bg-zinc-900 hover:text-white gap-2"
                        onClick={handleRestart}
                    >
                        <RefreshCw className="w-4 h-4" /> 다시 보기
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
