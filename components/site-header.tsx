"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/mission",
      label: "미션: 쿠팡아웃",
      active: pathname === "/mission",
    },
    {
      href: "/why",
      label: "왜 쿠팡아웃인가?",
      active: pathname === "/why",
    },
    {
      href: "/about",
      label: "캠페인 소개",
      active: pathname === "/about",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 mx-auto">
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter text-red-600">
              쿠팡아웃
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  route.active ? "text-foreground" : "text-foreground/60"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between md:justify-end">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-bold text-lg text-red-600">쿠팡아웃</span>
                </Link>
              </div>
              <div className="flex flex-col gap-4 mt-8 px-7">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-foreground/80",
                      route.active ? "text-foreground" : "text-foreground/60"
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden md:flex">
              <a href="mailto:contact@coupang-out.com">
                문의하기
              </a>
            </Button>
            <div className="md:hidden flex items-center">
              <Link href="/" className="font-bold mr-4 text-red-600">쿠팡아웃</Link>
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
