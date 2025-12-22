"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

declare global {
    interface Window {
        twttr: any;
    }
}

export function TwitterTimeline() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)

        // Manual trigger for Twitter widget in case script is already loaded
        if (typeof window !== 'undefined' && window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
    }, [])

    return (
        <div className="w-full bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm border h-[600px]">
            <div className="p-4 border-b">
                <h3 className="font-bold text-lg">📢 실시간 트위터 여론</h3>
                <p className="text-sm text-muted-foreground">#쿠팡아웃 공식 계정의 타임라인입니다.</p>
            </div>

            <div className="h-full overflow-y-auto custom-scrollbar">
                {isClient && (
                    <>
                        <a
                            className="twitter-timeline"
                            data-lang="ko"
                            data-height="530"
                            data-theme="light"
                            href="https://twitter.com/coupang_out?ref_src=twsrc%5Etfw"
                        >
                            Loading Tweets...
                        </a>
                        <Script
                            src="https://platform.twitter.com/widgets.js"
                            strategy="afterInteractive"
                            onLoad={() => {
                                // console.log("Twitter widget loaded")
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
