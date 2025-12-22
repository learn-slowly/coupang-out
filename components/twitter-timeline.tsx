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

        // Robust script injection
        if (typeof window !== 'undefined') {
            const scriptId = 'twitter-wjs';
            const scriptSrc = "https://platform.twitter.com/widgets.js";

            // If script doesn't exist, create it
            if (!document.getElementById(scriptId)) {
                const script = document.createElement('script');
                script.id = scriptId;
                script.src = scriptSrc;
                script.async = true;
                document.body.appendChild(script);
            } else {
                // If script exists, manually re-scan/load widgets
                // This covers cases where script loaded but component wasn't ready
                if (window.twttr && window.twttr.widgets) {
                    window.twttr.widgets.load();
                }
            }
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
                    <div className="px-4">
                        <a
                            className="twitter-timeline"
                            data-lang="ko"
                            data-height="530"
                            data-theme="light"
                            href="https://twitter.com/coupang_out?ref_src=twsrc%5Etfw"
                        >
                            Loading Tweets...
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
