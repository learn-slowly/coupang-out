"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

declare global {
    interface Window {
        twttr: any;
    }
}

export function TwitterTimeline() {
    return (
        <div className="w-full bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm border h-[600px]">
            <div className="p-4 border-b">
                <h3 className="font-bold text-lg">📢 실시간 트위터 여론</h3>
                <p className="text-sm text-muted-foreground">#쿠팡아웃 공식 계정의 타임라인입니다.</p>
            </div>

            <div className="h-full overflow-y-auto custom-scrollbar">
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
                        strategy="lazyOnload"
                        charSet="utf-8"
                    />
                </div>
            </div>
        </div>
    )
}
