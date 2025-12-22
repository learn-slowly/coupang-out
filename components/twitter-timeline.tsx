"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

declare global {
    interface Window {
        twttr: any;
    }
}

export function TwitterTimeline() {
    useEffect(() => {
        // Safe single-shot trigger for cases where script is cached/already loaded
        // but component mounted afterwards.
        if (typeof window !== 'undefined' && window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
    }, []);

    return (
        <div className="w-full bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm border h-[600px] flex flex-col">
            <div className="p-4 border-b">
                <h3 className="font-bold text-lg">📢 실시간 트위터 여론</h3>
                <p className="text-sm text-muted-foreground">#쿠팡아웃 공식 계정의 타임라인입니다.</p>
            </div>

            <div className="h-full overflow-y-auto custom-scrollbar flex-1 relative">
                <div className="px-4 py-4">
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
                            // Trigger load when script finishes loading
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
