import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function SiteFooter() {
    return (
        <footer className="py-6 md:py-0 bg-zinc-50 dark:bg-zinc-900 border-t">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 mx-auto">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <div className="text-center md:text-left text-[11px] md:text-sm text-muted-foreground leading-tight md:leading-relaxed whitespace-nowrap md:whitespace-normal">
                        <p>© 2025 <span className="font-semibold">정의당</span>.</p>
                        <p>돈보다 생명이 먼저입니다. 공익을 위한 자유로운 공유를 환영합니다.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link href="/about" className="hover:underline underline-offset-4">
                        캠페인 소개
                    </Link>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="mailto:coupangout@gmail.com" className="hover:underline underline-offset-4">
                        문의하기
                    </a>
                </div>
            </div>
        </footer>
    )
}
