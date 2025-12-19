"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { UploadCloud, X, Loader2, ChevronDown, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import imageCompression from "browser-image-compression"
import Masonry from 'react-masonry-css'
import { supabase } from "@/lib/supabase"

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
    image_url: string
    comment?: string
    created_at: string
}

export default function MissionClient() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [posts, setPosts] = useState<Post[]>([])
    const [postCount, setPostCount] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
    })

    // Fetch initial posts and count
    useEffect(() => {
        fetchPosts();
        fetchCount();

        // Subscribe to new changes? (Optional later)
    }, [])

    const fetchPosts = async () => {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('mission_posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            setPosts(data || []);
        }
    }

    const fetchCount = async () => {
        if (!supabase) return;
        const { count, error } = await supabase
            .from('mission_posts')
            .select('*', { count: 'exact', head: true });

        if (!error && count !== null) {
            setPostCount(count);
        }
    }

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
        if (selectedFile.size > 10 * 1024 * 1024) {
            toast.error("파일 크기는 10MB 이하여야 합니다.")
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

        if (!supabase) {
            toast.error("Supabase 연결이 설정되지 않았습니다.");
            return;
        }

        setUploading(true)
        setProgress(10)

        try {
            // 1. Image Compression
            toast.info("이미지 최적화 중...")
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                onProgress: (p) => setProgress(10 + (p * 0.4)) // 10% ~ 50%
            })

            // 2. Upload to Supabase Storage
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${compressedFile.name.split('.').pop()}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('mission-images')
                .upload(fileName, compressedFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;
            setProgress(80);

            // 3. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('mission-images')
                .getPublicUrl(fileName);

            // 4. Save Metadata to DB
            const { error: dbError } = await supabase
                .from('mission_posts')
                .insert([
                    {
                        image_url: publicUrl,
                        comment: values.comment,
                        // display_url can be added if we use CDN resizing later
                    }
                ])

            if (dbError) throw dbError;

            setProgress(100);
            toast.success("인증이 완료되었습니다!", {
                description: "참여해 주셔서 감사합니다."
            })

            // Refresh List
            fetchPosts();
            fetchCount();

            form.reset()
            removeFile()

        } catch (error: any) {
            console.error(error)
            toast.error("업로드에 실패했습니다.", {
                description: error.message || "잠시 후 다시 시도해주세요."
            })
        } finally {
            setUploading(false)
            setProgress(0)
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

            {/* Dashboard Mock (with Real Count) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border text-center">
                <div className="col-span-2 md:col-span-4 mb-4">
                    <span className="text-sm text-muted-foreground font-medium">현재까지 참여 인원</span>
                    <div className="text-5xl md:text-6xl font-black text-red-600 mt-2 tracking-tighter transition-all">
                        {(12345 + postCount).toLocaleString()}<span className="text-2xl md:text-3xl text-foreground font-bold ml-1">명</span>
                    </div>
                </div>
                <div className="border-r border-zinc-200 dark:border-zinc-800 last:border-0 pl-4 md:pl-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">오늘</p>
                    <p className="text-xl font-bold">+{postCount}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">이번 주</p>
                    <p className="text-xl font-bold">+{892 + postCount}</p>
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
                                            <p className="text-xs text-muted-foreground">JPG, PNG, WebP (최대 10MB)</p>
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
                    {posts.length === 0 ? (
                        // Skeleton Loading or Empty
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="mb-4 break-inside-avoid bg-zinc-100 dark:bg-zinc-800 rounded-lg aspect-[4/3] animate-pulse" />
                        ))
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="mb-4 break-inside-avoid shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-zinc-900 border rounded-lg overflow-hidden relative group">
                                <div className="relative bg-zinc-100 w-full">
                                    <Image
                                        src={post.image_url}
                                        alt="인증샷"
                                        width={500}
                                        height={500}
                                        className="w-full h-auto object-cover"
                                        unoptimized={true} // Allow external Supabase URLs
                                    />
                                </div>
                                {post.comment && (
                                    <div className="p-4">
                                        <p className="text-sm font-medium leading-relaxed line-clamp-4">{post.comment}</p>
                                        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </Masonry>

                <div className="flex justify-center pt-8">
                    <Button variant="secondary" size="lg" disabled>더 많은 인증샷 보기 (준비중)</Button>
                </div>
            </div>
        </div>
    )
}
