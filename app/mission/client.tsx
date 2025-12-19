"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { UploadCloud, X, Loader2, ChevronDown } from "lucide-react"
import { toast } from "sonner"
import imageCompression from "browser-image-compression"
import Masonry from 'react-masonry-css'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

// Validation Schema
const formSchema = z.object({
    comment: z.string().max(200, "200자 이내로 입력해주세요.").optional(),
})

interface Post {
    id: string
    imageUrl: string
    comment?: string
    date: string
}

// Mock Data
const MOCK_POSTS: Post[] = [
    { id: '1', imageUrl: '/placeholder.svg', comment: '탈퇴 완료했습니다. 더 이상 못 참겠네요.', date: '2023-12-19' },
    { id: '2', imageUrl: '/placeholder.svg', comment: '안녕히 계세요.', date: '2023-12-19' },
    { id: '3', imageUrl: '/placeholder.svg', comment: '', date: '2023-12-18' },
    { id: '4', imageUrl: '/placeholder.svg', comment: '소상공인 갑질 너무합니다.', date: '2023-12-18' },
    { id: '5', imageUrl: '/placeholder.svg', comment: '로켓와우 해지했습니다.', date: '2023-12-18' },
    { id: '6', imageUrl: '/placeholder.svg', comment: '쿠팡플레이도 지웠어요.', date: '2023-12-17' },
]

export default function MissionClient() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
    })

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) processFile(selectedFile)
    }

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0]
        if (droppedFile) processFile(droppedFile)
    }

    const handleDragOver = (event: React.DragEvent) => event.preventDefault()

    const processFile = async (selectedFile: File) => {
        if (!selectedFile.type.startsWith("image/")) {
            toast.error("이미지 파일만 업로드 가능합니다.")
            return
        }
        if (selectedFile.size > 5 * 1024 * 1024) {
            toast.error("파일 크기는 5MB 이하여야 합니다.")
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
        setFile(selectedFile)
    }

    const removeFile = () => {
        setFile(null)
        setPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!file) {
            toast.error("인증샷을 첨부해주세요.")
            return
        }

        setUploading(true)
        setProgress(0)

        try {
            toast.info("이미지 압축 중...")
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1280,
                useWebWorker: true
            })

            for (let i = 0; i <= 100; i += 10) {
                setProgress(i)
                await new Promise(resolve => setTimeout(resolve, 100))
            }

            console.log("Uploaded:", compressedFile.name, values.comment)
            toast.success("인증이 완료되었습니다!", {
                description: "참여해 주셔서 감사합니다."
            })

            form.reset()
            removeFile()
            setUploading(false)

        } catch (error) {
            console.error(error)
            toast.error("업로드 중 오류가 발생했습니다.")
            setUploading(false)
        }
    }

    // Grid Breakpoints
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 2
    };

    return (
        <div className="container py-12 px-4 max-w-5xl mx-auto space-y-12">

            {/* Header */}
            <div className="text-center space-y-4">
                <Badge variant="outline" className="mb-2 text-red-600 border-red-200 bg-red-50">Mission 01</Badge>
                <h1 className="text-4xl font-bold tracking-tight">미션: 쿠팡아웃</h1>
                <p className="text-xl text-muted-foreground">
                    당신의 선택이 변화를 만듭니다. <br className="md:hidden" /> 탈퇴 인증으로 힘을 보태주세요.
                </p>
            </div>

            {/* Dashboard Mock */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border text-center">
                <div className="col-span-2 md:col-span-4 mb-4">
                    <span className="text-sm text-muted-foreground font-medium">현재까지 참여 인원</span>
                    <div className="text-5xl md:text-6xl font-black text-red-600 mt-2 tracking-tighter">
                        12,345<span className="text-2xl md:text-3xl text-foreground font-bold ml-1">명</span>
                    </div>
                </div>
                <div className="border-r border-zinc-200 dark:border-zinc-800 last:border-0 pl-4 md:pl-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">오늘</p>
                    <p className="text-xl font-bold">+128</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">이번 주</p>
                    <p className="text-xl font-bold">+892</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">

                {/* Guide Accordion */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">탈퇴 가이드</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>1. 쿠팡 와우 멤버십 해지</AccordionTrigger>
                            <AccordionContent>
                                마이쿠팡 &gt; 와우 멤버십 &gt; 해지하기 버튼을 눌러 멤버십을 먼저 해지해주세요.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>2. 쿠팡페이 탈퇴</AccordionTrigger>
                            <AccordionContent>
                                쿠페이 머니 잔액이 있다면 환불받거나 소진해야 합니다. 결제수단 관리에서 등록된 카드를 삭제해주세요.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>3. 회원 탈퇴 진행</AccordionTrigger>
                            <AccordionContent>
                                PC: 마이쿠팡 &gt; 개인정보수정 &gt; 회원탈퇴<br />
                                모바일: 마이쿠팡 &gt; 내 정보 관리 &gt; 회원탈퇴<br />
                                <p className="mt-2 text-red-600 text-sm font-medium">주의: 미사용 쿠폰이나 포인트는 소멸됩니다.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="bg-muted p-4 rounded-lg text-sm">
                        <p className="font-semibold mb-1">💡 팁</p>
                        <p>탈퇴 완료 화면을 캡처해두면 인증하기 편해요!</p>
                    </div>
                </div>

                {/* Upload Form */}
                <Card className="border-2 border-red-100 dark:border-red-900/30 shadow-lg">
                    <CardHeader>
                        <CardTitle>인증샷 업로드</CardTitle>
                        <CardDescription>익명으로 안전하게 게재됩니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${preview ? 'border-primary bg-primary/5' : 'border-zinc-300 hover:border-primary/50 hover:bg-zinc-50 dark:border-zinc-700'
                                        }`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onClick={() => !preview && fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                    {preview ? (
                                        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black/5 group">
                                            <Image src={preview} alt="Preview" fill className="object-contain" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <UploadCloud className="h-10 w-10 text-muted-foreground" />
                                            <p className="font-medium">
                                                클릭 또는 드래그하여 업로드
                                            </p>
                                            <p className="text-xs text-muted-foreground">JPG, PNG, WebP (최대 5MB)</p>
                                        </div>
                                    )}
                                </div>

                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>참여 소감 (선택)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="왜 탈퇴를 결심하셨나요? 짧은 한마디를 남겨주세요."
                                                    className="resize-none h-20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {uploading && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span>업로드 중...</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                    </div>
                                )}

                                <Button type="submit" size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold" disabled={uploading}>
                                    {uploading ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 처리 중...</>
                                    ) : (
                                        "인증 완료하기"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

            {/* Gallery Section */}
            <div className="space-y-6 pt-12 border-t">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold">실시간 인증 현황</h2>
                        <p className="text-muted-foreground mt-1">지금 이 순간에도 변화는 일어나고 있습니다.</p>
                    </div>
                </div>

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto -ml-4"
                    columnClassName="pl-4 bg-clip-padding"
                >
                    {MOCK_POSTS.map((post) => (
                        <div key={post.id} className="mb-4 break-inside-avoid shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-zinc-900 border rounded-lg overflow-hidden">
                            <div className="relative bg-zinc-100 aspect-[4/3]">
                                {/* In real app, use next/image with proper Loading */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                                    <UploadCloud className="h-8 w-8" />
                                </div>
                            </div>
                            {post.comment && (
                                <div className="p-4">
                                    <p className="text-sm font-medium leading-relaxed line-clamp-4">{post.comment}</p>
                                    <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">{post.date}</p>
                                </div>
                            )}
                        </div>
                    ))}
                    {MOCK_POSTS.map(post => ({ ...post, id: post.id + "_dup1" })).map((post) => (
                        <div key={post.id} className="mb-4 break-inside-avoid shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-zinc-900 border rounded-lg overflow-hidden">
                            <div className="relative bg-zinc-100 aspect-square">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                                    <UploadCloud className="h-8 w-8" />
                                </div>
                            </div>
                            {post.comment && (
                                <div className="p-4">
                                    <p className="text-sm font-medium leading-relaxed line-clamp-4">{post.comment}</p>
                                    <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">{post.date}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </Masonry>

                <div className="flex justify-center pt-8">
                    <Button variant="secondary" size="lg">더 많은 인증샷 보기</Button>
                </div>
            </div>
        </div>
    )
}
