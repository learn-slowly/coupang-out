"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Send } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { createMissionPost } from "./actions"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Validation Schema
const formSchema = z.object({
    email: z.string().email("올바른 이메일 주소를 입력해주세요."),
    message: z.string().min(2, "메시지를 2글자 이상 입력해주세요.").max(500, "500자 이내로 입력해주세요."),
})

interface Message {
    id: string
    message: string
    created_at: string
}

function MissionClientContent() {
    const [uploading, setUploading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const { executeRecaptcha } = useGoogleReCaptcha()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            message: "",
        },
    })

    // Fetch initial messages and count
    useEffect(() => {
        fetchMessages();
        fetchCount();

        // Subscription for real-time updates
        if (!supabase) return;
        const channel = supabase
            .channel('mission_messages_changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mission_messages' }, (payload) => {
                const newMessage = payload.new as Message;
                setMessages((prev) => [newMessage, ...prev]);
                setTotalCount((prev) => prev + 1);
            })
            .subscribe();

        return () => {
            supabase?.removeChannel(channel);
        }
    }, [])

    const fetchMessages = async () => {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('mission_messages')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) {
            console.error('Error fetching messages:', error);
        } else {
            setMessages(data || []);
        }
    }

    const fetchCount = async () => {
        if (!supabase) return;
        const { count, error } = await supabase
            .from('mission_messages')
            .select('*', { count: 'exact', head: true });

        if (!error && count !== null) {
            setTotalCount(count);
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!supabase) {
            toast.error("Supabase 연결이 설정되지 않았습니다.");
            return;
        }

        setUploading(true)

        try {
            // Get Captcha Token
            let captchaToken = "";
            if (executeRecaptcha) {
                captchaToken = await executeRecaptcha("mission_message");
            }

            const response = await createMissionPost({
                email: values.email,
                message: values.message,
                captchaToken: captchaToken
            });

            if (!response.success) {
                throw new Error(response.message || "서버 요청 실패");
            }

            toast.success("메시지가 등록되었습니다!", {
                description: "소중한 의견 감사합니다."
            })

            // Note: Optimistic update is handled by Subscription or refetch if needed.
            // But since we have subscription, we might not need to refetch manually if insert works.
            // However, manual refetch ensures we have the latest server state if subscription is slow.
            // Let's just reset form.

            form.reset()

        } catch (error: any) {
            console.error(error)
            toast.error("등록에 실패했습니다.", {
                description: error.message || "잠시 후 다시 시도해주세요."
            })
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="container py-12 px-4 max-w-4xl mx-auto space-y-12">

            {/* Header */}
            <div className="text-center space-y-4">
                <Badge variant="outline" className="mb-2 text-red-600 border-red-200 bg-red-50">Mission 01</Badge>
                <h1 className="text-4xl font-bold tracking-tight">쿠팡 탈퇴</h1>
                <p className="text-xl text-muted-foreground">
                    쿠팡 탈퇴로 우리의 의지를 보여주고, <br className="md:hidden" />
                    메시지로 서로를 응원해주세요.
                </p>
            </div>

            {/* Dashboard Stats */}
            <div className="flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border text-center">
                <span className="text-sm text-muted-foreground font-medium mb-2">현재까지 모인 목소리</span>
                <div className="text-5xl md:text-7xl font-black text-red-600 tracking-tighter transition-all">
                    {totalCount.toLocaleString()}<span className="text-2xl md:text-3xl text-foreground font-bold ml-2">건</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">

                {/* Left Column: Withdrawal Guide & Form */}
                <div className="space-y-12">

                    {/* Withdrawal Guide */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold">쿠팡 탈퇴 방법</h2>
                        </div>

                        <div className="rounded-xl overflow-hidden shadow-md bg-black max-w-[280px] mx-auto aspect-[9/16] mb-6 relative group ring-4 ring-zinc-900/5 dark:ring-zinc-100/10">
                            <video
                                src="/coupang-withdrawal-guide.mp4"
                                controls
                                className="w-full h-full object-cover"
                            >
                                브라우저가 비디오 태그를 지원하지 않습니다.
                            </video>
                        </div>

                        <div className="space-y-4">
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex gap-4">
                                        <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 font-bold text-sm">1</div>
                                        <div>
                                            <h3 className="font-bold mb-1">마이쿠팡 접속</h3>
                                            <p className="text-sm text-muted-foreground">앱/웹 하단 '마이쿠팡' 메뉴를 선택하세요.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 font-bold text-sm">2</div>
                                        <div>
                                            <h3 className="font-bold mb-1">내 정보 관리</h3>
                                            <p className="text-sm text-muted-foreground">회원이름을 클릭하거나 '내 정보 관리' 메뉴로 이동하세요.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-none flex items-center justify-center w-8 h-8 md:w-8 md:h-8 rounded-full bg-red-100 text-red-600 font-bold text-sm">!</div>
                                        <div>
                                            <h3 className="font-bold mb-1 text-red-600">잔액 확인 (중요)</h3>
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold text-foreground">쿠팡캐시/쿠페이머니 잔액이 0원</span>이어야 탈퇴가 가능합니다.<br />
                                                잔액이 있다면 미리 사용하거나 환불받아주세요.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 font-bold text-sm">3</div>
                                        <div>
                                            <h3 className="font-bold mb-1">회원탈퇴 선택</h3>
                                            <p className="text-sm text-muted-foreground">화면 최하단의 '회원탈퇴' 버튼을 찾아주세요.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 font-bold text-sm">4</div>
                                        <div>
                                            <h3 className="font-bold mb-1">비밀번호 확인 및 완료</h3>
                                            <p className="text-sm text-muted-foreground">비밀번호를 입력하고 탈퇴 사유를 선택하면 완료됩니다.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Message Form */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Send className="w-5 h-5 text-red-600" />
                            <h2 className="text-2xl font-bold">인증샷 대신 한마디</h2>
                        </div>
                        <Card className="border-2 border-red-100 dark:border-red-900/30 shadow-lg">
                            <CardHeader>
                                <CardTitle>메시지 남기기</CardTitle>
                                <CardDescription>탈퇴 완료 후, 쿠팡에게 전하고 싶은 말을 남겨주세요.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>이메일 (비공개)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="example@email.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>메시지 (공개)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="탈퇴 이유는 무엇인가요? 쿠팡에게 바라는 점은 무엇인가요?"
                                                            className="resize-none h-32 text-base"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button type="submit" size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold" disabled={uploading}>
                                            {uploading ? (
                                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 전송 중...</>
                                            ) : (
                                                "메시지 등록하기"
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </section>

                </div>

                {/* List Section */}
                <div className="space-y-6 h-full flex flex-col">
                    <h2 className="text-2xl font-bold">실시간 메시지</h2>
                    <ScrollArea className="h-[600px] w-full rounded-md border p-4 bg-white dark:bg-zinc-950 shadow-inner">
                        <div className="space-y-4">
                            {messages.length === 0 ? (
                                <p className="text-center text-muted-foreground py-10">아직 등록된 메시지가 없습니다.<br />첫 번째 목소리가 되어주세요!</p>
                            ) : (
                                messages.map((msg, index) => {
                                    // Random gradients based on index to be consistent during hydration
                                    const gradients = [
                                        "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-red-100 dark:border-red-900/50",
                                        "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-100 dark:border-orange-900/50",
                                        "bg-gradient-to-br from-yellow-50 to-lime-50 dark:from-yellow-950/30 dark:to-lime-950/30 border-yellow-100 dark:border-yellow-900/50",
                                        "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-100 dark:border-green-900/50",
                                        "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-teal-100 dark:border-teal-900/50",
                                        "bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30 border-sky-100 dark:border-blue-900/50",
                                        "bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border-indigo-100 dark:border-indigo-900/50",
                                        "bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/30 dark:to-fuchsia-950/30 border-purple-100 dark:border-purple-900/50",
                                    ];
                                    const styleClass = gradients[index % gradients.length];

                                    return (
                                        <div key={msg.id} className={`flex gap-4 p-4 rounded-xl border animate-in fade-in slide-in-from-bottom-2 ${styleClass}`}>
                                            <Avatar className="w-10 h-10 border bg-white/80 dark:bg-black/20 backdrop-blur-sm">
                                                <AvatarFallback className="bg-transparent text-zinc-600 dark:text-zinc-300 font-bold">
                                                    {msg.message.substring(0, 1)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-relaxed break-all text-zinc-800 dark:text-zinc-200">
                                                    {msg.message}
                                                </p>
                                                <p className="text-xs text-zinc-500 font-light text-right">
                                                    {new Date(msg.created_at).toLocaleDateString()} {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}

export default function MissionClient() {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
            language="ko"
        >
            <MissionClientContent />
        </GoogleReCaptchaProvider>
    )
}
