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
                <h1 className="text-4xl font-bold tracking-tight">쿠팡에게 한마디</h1>
                <p className="text-xl text-muted-foreground">
                    우리의 목소리가 모이면 변화를 만들 수 있습니다. <br className="md:hidden" />
                    쿠팡에게 전하고 싶은 말을 남겨주세요.
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

                {/* Form Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Send className="w-5 h-5 text-red-600" />
                        <h2 className="text-2xl font-bold">메시지 보내기</h2>
                    </div>
                    <Card className="border-2 border-red-100 dark:border-red-900/30 shadow-lg">
                        <CardHeader>
                            <CardTitle>작성하기</CardTitle>
                            <CardDescription>이메일은 공개되지 않으며, 비방이나 욕설은 삭제될 수 있습니다.</CardDescription>
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
                                                        placeholder="쿠팡에게 전하고 싶은 말을 자유롭게 적어주세요."
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
                </div>

                {/* List Section */}
                <div className="space-y-6 h-full flex flex-col">
                    <h2 className="text-2xl font-bold">실시간 메시지</h2>
                    <ScrollArea className="h-[600px] w-full rounded-md border p-4 bg-white dark:bg-zinc-950 shadow-inner">
                        <div className="space-y-4">
                            {messages.length === 0 ? (
                                <p className="text-center text-muted-foreground py-10">아직 등록된 메시지가 없습니다.<br />첫 번째 목소리가 되어주세요!</p>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className="flex gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border animate-in fade-in slide-in-from-bottom-2">
                                        <Avatar className="w-10 h-10 border">
                                            <AvatarFallback className="bg-red-100 text-red-600 font-bold">
                                                {msg.message.substring(0, 1)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-relaxed break-all">
                                                {msg.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground font-light text-right">
                                                {new Date(msg.created_at).toLocaleDateString()} {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
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
