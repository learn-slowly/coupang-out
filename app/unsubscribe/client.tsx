"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { UploadCloud, X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import imageCompression from "browser-image-compression"

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
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Validation Schema
const formSchema = z.object({
    comment: z.string().max(200, "200자 이내로 입력해주세요.").optional(),
    // Image validation handled manually for drag-drop convenience, 
    // but we can ensure it exists before submit
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
]


export default function UnsubscribePage() {
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

    // Handle File Select
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) processFile(selectedFile)
    }

    // Handle Drag & Drop
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

        // Generate Preview
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

    // Handle Submit
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!file) {
            toast.error("인증샷을 첨부해주세요.")
            return
        }

        setUploading(true)
        setProgress(0)

        try {
            // Mock Compression
            toast.info("이미지 압축 중...")
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1280,
                useWebWorker: true
            })

            // Mock Upload Process
            for (let i = 0; i <= 100; i += 10) {
                setProgress(i)
                await new Promise(resolve => setTimeout(resolve, 100))
            }

            console.log("Uploaded:", compressedFile.name, values.comment)
            toast.success("인증이 완료되었습니다!", {
                description: "참여해 주셔서 감사합니다."
            })

            // Reset
            form.reset()
            removeFile()
            setUploading(false)

        } catch (error) {
            console.error(error)
            toast.error("업로드 중 오류가 발생했습니다.")
            setUploading(false)
        }
    }

    return (
        <div className="container py-12 px-4 max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">탈퇴 인증하기</h1>
                <p className="text-muted-foreground">
                    쿠팡 탈퇴 화면을 캡처하여 올려주세요. 여러분의 행동이 변화를 만듭니다.
                </p>
            </div>

            {/* Upload Section */}
            <Card>
                <CardContent className="p-6 md:p-10 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Steps */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">참여 방법</h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                                <li>쿠팡 앱/웹사이트에서 회원 탈퇴를 진행합니다.</li>
                                <li>'탈퇴가 완료되었습니다' 화면을 캡처합니다.</li>
                                <li>이미지를 이곳에 업로드하고 간단한 소감을 남겨주세요.</li>
                            </ol>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                    {/* File Dropzone */}
                                    <div
                                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${preview ? 'border-primary/50 bg-primary/5' : 'border-zinc-200 hover:border-primary/50 hover:bg-zinc-50 dark:border-zinc-800'
                                            }`}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />

                                        {preview ? (
                                            <div className="relative aspect-video w-full max-h-[200px] mx-auto overflow-hidden rounded-md bg-black/5">
                                                <Image src={preview} alt="Preview" fill className="object-contain" />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2 h-6 w-6"
                                                    onClick={removeFile}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div
                                                className="flex flex-col items-center gap-2 cursor-pointer h-[200px] justify-center"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <UploadCloud className="h-10 w-10 text-muted-foreground" />
                                                <p className="text-sm font-medium">
                                                    클릭하여 업로드하거나<br />이미지를 드래그하세요
                                                </p>
                                                <p className="text-xs text-muted-foreground">최대 5MB</p>
                                            </div>
                                        )}
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="comment"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>한마디 (선택)</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="탈퇴 이유나 응원의 메시지를 남겨주세요."
                                                        className="resize-none"
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

                                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={uploading}>
                                        {uploading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 처리 중...
                                            </>
                                        ) : (
                                            "인증 완료하기"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Gallery Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">최근 참여 인증</h2>
                    <span className="text-red-600 font-bold">12,345명 참여 중</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {MOCK_POSTS.map((post) => (
                        <div key={post.id} className="group relative break-inside-avoid mb-4">
                            {/* Note: Standard Grid is used here instead of true Masonry for simplicity/MVP. 
                   For true masonry, usually need columns or CSS columns property.
                   Tailwind 'columns-2 md:columns-4 gap-4' can do masonry-like layout.
               */}
                        </div>
                    ))}
                    {/* Using CSS columns for Masonry layout */}
                    <div className="col-span-2 md:col-span-4 columns-2 md:columns-4 gap-4 space-y-4">
                        {MOCK_POSTS.map((post) => (
                            <div key={post.id} className="break-inside-avoid bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden border">
                                <div className="aspect-square relative bg-zinc-200">
                                    {/* Placeholder image logic */}
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                        IMAGE
                                    </div>
                                </div>
                                {post.comment && (
                                    <div className="p-3">
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-3">{post.comment}</p>
                                        <p className="text-xs text-muted-foreground mt-2">{post.date}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Repeat mock posts to fill */}
                        {MOCK_POSTS.map((post) => (
                            <div key={post.id + 'dup'} className="break-inside-avoid bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden border">
                                <div className="aspect-[3/4] relative bg-zinc-200">
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                        IMAGE
                                    </div>
                                </div>
                                {post.comment && (
                                    <div className="p-3">
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-3">{post.comment}</p>
                                        <p className="text-xs text-muted-foreground mt-2">{post.date}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center pt-8">
                    <Button variant="outline">더 보기</Button>
                </div>
            </div>
        </div>
    )
}
