"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { issuesData, categoryLabels, IssueCategory, Issue } from "@/lib/data"
import { Download, Share2, ExternalLink } from "lucide-react"
import { toast } from "sonner"


export default function IssuesPage() {
    const categories: IssueCategory[] = ['labor', 'privacy', 'unfair-practice', 'union-busting'];

    const handleShare = (issue: Issue) => {
        // Mock share functionality
        navigator.clipboard.writeText(`${issue.title} - 쿠팡 탈퇴 캠페인\n\n${issue.description}\nhttps://example.com/issues`);
        toast.success("링크와 내용이 복사되었습니다.", {
            description: "SNS에 공유하여 진실을 알려주세요."
        });
    };

    const handleDownloadPDF = () => {
        toast.info("PDF 다운로드 준비 중입니다.");
    };

    return (
        <div className="container py-12 px-4 space-y-8 max-w-5xl mx-auto">
            <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    쿠팡의 문제점 상세 정리
                </h1>
                <p className="text-lg text-muted-foreground">
                    우리가 쿠팡을 떠나야 하는 이유들입니다. 팩트에 근거하여 정리했습니다.
                </p>
                <div className="flex justify-center md:justify-start">
                    <Button variant="outline" onClick={handleDownloadPDF}>
                        <Download className="mr-2 h-4 w-4" />
                        전체 자료 PDF 다운로드
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="labor" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
                    {categories.map((cat) => (
                        <TabsTrigger key={cat} value={cat} className="py-3 text-sm md:text-base">
                            {categoryLabels[cat]}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map((cat) => (
                    <TabsContent key={cat} value={cat} className="mt-6 space-y-6">
                        {issuesData
                            .filter(issue => issue.category === cat)
                            .map((issue) => (
                                <Card key={issue.id} className="w-full">
                                    <CardHeader>
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <CardTitle className="text-xl md:text-2xl text-red-600 mb-2">{issue.title}</CardTitle>
                                                <CardDescription className="text-base text-black dark:text-zinc-200">
                                                    {issue.description}
                                                </CardDescription>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => handleShare(issue)} className="shrink-0">
                                                <Share2 className="h-5 w-5" />
                                                <span className="sr-only">공유하기</span>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1" className="border-b-0">
                                                <AccordionTrigger className="hover:no-underline py-0 text-muted-foreground font-medium">
                                                    상세 팩트 및 근거 보기
                                                </AccordionTrigger>
                                                <AccordionContent className="pt-4 space-y-4">
                                                    <ul className="list-disc pl-5 space-y-2 text-base">
                                                        {issue.facts.map((fact, index) => (
                                                            <li key={index}>{fact}</li>
                                                        ))}
                                                    </ul>
                                                    <div className="pt-4 border-t mt-4">
                                                        <h4 className="text-sm font-semibold mb-2">출처 및 참고자료</h4>
                                                        <ul className="space-y-1">
                                                            {issue.sources.map((source, idx) => (
                                                                <li key={idx}>
                                                                    <a
                                                                        href={source.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                                                    >
                                                                        {source.title} <ExternalLink className="h-3 w-3" />
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            ))}

                        {issuesData.filter(i => i.category === cat).length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                해당 카테고리의 이슈가 곧 업데이트될 예정입니다.
                            </div>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
