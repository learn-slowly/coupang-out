import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function SiteFooter() {
    return (
        <footer className="py-6 md:py-0 bg-zinc-50 dark:bg-zinc-900 border-t">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 mx-auto">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2025 <span className="font-bold">쿠팡아웃 캠페인</span>. All rights reserved.
                    </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link href="/about" className="hover:underline underline-offset-4">
                        캠페인 소개
                    </Link>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="mailto:coupangout@gmail.com" className="hover:underline underline-offset-4">
                        문의하기
                    </a>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="https://twitter.com/coupangout" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">
                        X (Twitter)
                    </a>
                </div>
            </div>
        </footer>
    )
}
