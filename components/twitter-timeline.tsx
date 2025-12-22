"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

declare global {
    interface Window {
        twttr: any;
    }
}

export function TwitterTimeline() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // 1. Safe single-shot trigger for cases where script is cached/already loaded
        if (typeof window !== 'undefined' && window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }

        // 2. Bind 'rendered' event to detect success
        const checkAndBind = setInterval(() => {
            if (window.twttr && window.twttr.events) {
                window.twttr.events.bind('rendered', () => {
                    console.log("Twitter widget rendered successfully");
                    setIsLoaded(true);
                });
                clearInterval(checkAndBind);
            }
        }, 500);

        return () => clearInterval(checkAndBind);
    }, []);

    return (
        <div className="w-full bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm border h-[600px] flex flex-col">
            <div className="p-4 border-b">
                <h3 className="font-bold text-lg">📢 실시간 트위터 여론</h3>
                <p className="text-sm text-muted-foreground">#쿠팡아웃 공식 계정의 타임라인입니다.</p>
            </div>

            <div className="flex-1 relative bg-white dark:bg-zinc-950/50">
                {/* Fallback Content (Fake Tweet) - Shows when loading or 429 blocked */}
                <div
                    className={`absolute inset-0 p-4 overflow-y-auto transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <div className="flex gap-3">
                        <div className="flex-none">
                            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">
                                CO
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-[15px] text-zinc-900 dark:text-zinc-100">쿠팡아웃</span>
                                <span className="text-[14px] text-zinc-500">@coupang_out · 1h</span>
                            </div>

                            <p className="text-[15px] text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-normal">
                                #쿠팡탈퇴 우리가 쿠팡을 멈춘다⛔️<br /><br />

                                대규모 개인정보유출, 반복되는 노동자착취와 산업재해, 블랙리스트, 입점업체 갑질, 소비자 기만, 대관로비... 새벽배송이라는 편의에도 악덕기업 쿠팡을 멈추기 위해 탈퇴하는 사람들이 늘어나고 있습니다. 우리가 소비를 멈추면 쿠팡을 멈출 수 있습니다!
                            </p>

                            <div className="rounded-xl overflow-hidden border mt-2">
                                <img
                                    src="/G8xCoQjbMAAOTwM.png"
                                    alt="Coupang Out Campaign"
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            {/* Fake Actions */}
                            <div className="flex justify-between max-w-[300px] text-zinc-500 mt-2 text-sm">
                                <span className="hover:text-sky-500 cursor-pointer">💬 12</span>
                                <span className="hover:text-green-500 cursor-pointer"> 45</span>
                                <span className="hover:text-red-500 cursor-pointer">❤️ 128</span>
                                <span className="hover:text-sky-500 cursor-pointer">📊 1.2K</span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Placeholder / Loading Indicator below */}
                    <div className="mt-8 text-center">
                        <div className="inline-block animate-pulse text-xs text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                            실시간 피드를 불러오는 중...
                        </div>
                    </div>
                </div>

                {/* Real Widget container - Hidden strictly until loaded to prevent ugliness */}
                <div className={`h-full overflow-y-auto custom-scrollbar px-4 py-4 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <a
                        className="twitter-timeline"
                        href="https://twitter.com/coupang_out?ref_src=twsrc%5Etfw"
                        data-lang="ko"
                        data-height="500"
                        data-theme="light"
                    >
                        Tweets by coupang_out
                    </a>
                    <Script
                        src="https://platform.twitter.com/widgets.js"
                        strategy="afterInteractive"
                        charSet="utf-8"
                        onLoad={() => {
                            if (window.twttr && window.twttr.widgets) {
                                window.twttr.widgets.load();
                            }
                        }}
                    />
                </div>
            </div>

            {/* Fallback & Direct Link Button */}
            <div className="p-4 border-t bg-zinc-50 dark:bg-zinc-900">
                <a
                    href="https://twitter.com/coupang_out"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 px-4 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-lg font-bold transition-colors gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                    트위터에서 실시간 소식 보기
                </a>
            </div>
        </div>
    )
}
