"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { issuesData, categoryLabels, IssueCategory, Issue } from "@/lib/data"
import { Share2, ExternalLink, Instagram, Twitter, Facebook, Link as LinkIcon, Download, X } from "lucide-react"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"


export default function WhyClient() {
    const categories: IssueCategory[] = ['labor', 'privacy', 'unfair-practice', 'union-busting'];
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)

    const handleCopy = (text: string, platform: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${platform} 공유 텍스트가 복사되었습니다!`, {
            description: "SNS 앱을 열어 바로 붙여넣으세요."
        });
    };

    const handleShareClick = (issue: Issue) => {
        setSelectedIssue(issue);
    };

    return (
        <div className="container py-12 px-4 space-y-12 max-w-5xl mx-auto">
            <div className="space-y-4 text-center">
                <Badge variant="outline" className="mb-2 text-red-600 border-red-200 bg-red-50">Why Coupang Out?</Badge>
                <h1 className="text-4xl font-bold tracking-tight">
                    왜 쿠팡아웃인가?
                </h1>
                <p className="text-xl text-muted-foreground">
                    쿠팡의 구조적 문제, 하나씩 알아보세요.
                </p>
            </div>

            <Tabs defaultValue="labor" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-muted/50">
                    {categories.map((cat) => (
                        <TabsTrigger key={cat} value={cat} className="py-3 text-sm md:text-base font-medium">
                            {categoryLabels[cat]}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map((cat) => (
                    <TabsContent key={cat} value={cat} className="mt-8 space-y-8">
                        {issuesData
                            .filter(issue => issue.category === cat)
                            .map((issue) => (
                                <Card key={issue.id} className="w-full border-2 overflow-hidden">
                                    <div className="md:flex">
                                        <div className="md:w-full p-6 space-y-6">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <Badge className="mb-3 bg-red-100 text-red-700 hover:bg-red-200 border-0">
                                                        {categoryLabels[issue.category]}
                                                    </Badge>
                                                    <CardTitle className="text-2xl md:text-3xl text-red-600 mb-2">{issue.title}</CardTitle>
                                                    <div className="text-lg font-semibold text-foreground mb-2">
                                                        {issue.subtitle}
                                                    </div>
                                                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                                                        {issue.description}
                                                    </CardDescription>
                                                </div>
                                            </div>

                                            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-5 border">
                                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                    📌 핵심 팩트
                                                </h4>
                                                <ul className="space-y-2 mb-6">
                                                    {issue.facts.slice(0, 3).map((fact, index) => (
                                                        <li key={index} className="flex gap-2 text-sm md:text-base">
                                                            <span className="text-red-500 font-bold">•</span>
                                                            <span>{fact}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {issue.laws && issue.laws.length > 0 && (
                                                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-md border border-red-100 dark:border-red-900/30">
                                                        <h5 className="text-sm font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-1">
                                                            ⚖️ 위반 가능 법 조항
                                                        </h5>
                                                        <ul className="space-y-1">
                                                            {issue.laws.map((law, idx) => (
                                                                <li key={idx} className="text-xs md:text-sm text-red-800 dark:text-red-300">
                                                                    - {law}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                <Button size="lg" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold gap-2" onClick={() => handleShareClick(issue)}>
                                                    <Share2 className="h-5 w-5" />
                                                    공유하여 알리기
                                                </Button>
                                                <Accordion type="single" collapsible className="flex-1">
                                                    <AccordionItem value="details" className="border-b-0">
                                                        <AccordionTrigger className="justify-center py-2 px-4 border rounded-md hover:bg-zinc-100 hover:no-underline dark:hover:bg-zinc-800 text-sm h-11">
                                                            자세히 보기
                                                        </AccordionTrigger>
                                                        <AccordionContent className="pt-4">
                                                            <div className="bg-muted p-4 rounded-lg mt-2">
                                                                <ul className="list-disc pl-5 space-y-2 text-sm mb-4">
                                                                    {issue.facts.map((fact, i) => (
                                                                        <li key={i}>{fact}</li>
                                                                    ))}
                                                                </ul>
                                                                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                                                                    <p className="text-xs font-semibold mb-2 text-muted-foreground">출처</p>
                                                                    <ul className="space-y-1">
                                                                        {issue.sources.map((s, i) => (
                                                                            <li key={i}>
                                                                                <a href={s.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                                                                    {s.title} <ExternalLink className="h-3 w-3" />
                                                                                </a>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                    </TabsContent>
                ))}
            </Tabs>

            {/* Share Modal */}
            <Dialog open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>공유하기</DialogTitle>
                        <DialogDescription>
                            진실을 널리 알려주세요. 작은 공유가 큰 변화를 만듭니다.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedIssue && (
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-red-50 hover:text-red-600 hover:border-red-200" onClick={() => handleCopy(selectedIssue.shareText.instagram, "인스타그램")}>
                                <Instagram className="h-6 w-6" />
                                <span className="text-sm">인스타그램<br /><span className="text-xs text-muted-foreground font-normal">피드용 텍스트 복사</span></span>
                            </Button>
                            <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200" onClick={() => {
                                handleCopy(selectedIssue.shareText.twitter, "트위터");
                                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedIssue.shareText.twitter)}`, '_blank');
                            }}>
                                <Twitter className="h-6 w-6" />
                                <span className="text-sm">트위터 (X)<br /><span className="text-xs text-muted-foreground font-normal">자동완성 열기</span></span>
                            </Button>
                            <Button variant="outline" className="h-auto flex-col gap-2 p-4 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" onClick={() => handleCopy(selectedIssue.shareText.facebook, "페이스북")}>
                                <Facebook className="h-6 w-6" />
                                <span className="text-sm">페이스북<br /><span className="text-xs text-muted-foreground font-normal">텍스트 복사</span></span>
                            </Button>
                            <Button variant="outline" className="h-auto flex-col gap-2 p-4" onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success("링크가 복사되었습니다.");
                            }}>
                                <LinkIcon className="h-6 w-6" />
                                <span className="text-sm">링크 복사<br /><span className="text-xs text-muted-foreground font-normal">URL 복사하기</span></span>
                            </Button>
                            <div className="col-span-2 mt-2">
                                <Button className="w-full bg-zinc-800 text-white" onClick={() => toast.info("이미지 다운로드는 준비 중입니다.")}>
                                    <Download className="mr-2 h-4 w-4" /> 카드뉴스 이미지 다운로드 (준비중)
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
