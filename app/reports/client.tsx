"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, UploadCloud, CheckCircle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const reportSchema = z.object({
    category: z.enum(["overwork", "injury", "privacy", "unfair", "other"]),
    description: z.string().min(10, "최소 10자 이상 입력해주세요.").max(2000, "2000자 이내로 입력해주세요."),
    isAnonymous: z.boolean(),
    contactEmail: z.string().optional(),
}).refine((data) => {
    if (!data.isAnonymous && (!data.contactEmail || data.contactEmail.length === 0)) {
        return false;
    }
    return true;
}, {
    message: "실명 제보 시 연락처 이메일은 필수입니다.",
    path: ["contactEmail"],
});


export default function ReportsPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<z.infer<typeof reportSchema>>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            isAnonymous: true,
            description: "",
            contactEmail: "",
        },
    })

    const isAnonymous = form.watch("isAnonymous")

    const onSubmit = async (values: z.infer<typeof reportSchema>) => {
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log("Report submitted:", values)
        setIsSubmitting(false)
        setIsSuccess(true)
        toast.success("제보가 접수되었습니다.", {
            description: "용기 내어 주셔서 감사합니다."
        })
    }

    if (isSuccess) {
        return (
            <div className="container max-w-2xl py-20 px-4 mx-auto text-center space-y-6">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-20 h-20 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold">제보가 접수되었습니다</h1>
                <p className="text-muted-foreground text-lg">
                    보내주신 소중한 제보는 쿠팡의 문제점을 알리고<br />
                    세상을 바꾸는 데 큰 힘이 됩니다.
                </p>
                <div className="pt-8">
                    <Button onClick={() => { setIsSuccess(false); form.reset(); }} variant="outline">
                        추가 제보하기
                    </Button>
                    <Button className="ml-4" asChild>
                        <a href="/action">행동하기</a>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-2xl py-12 px-4 mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">피해사례 제보</h1>
                <p className="text-muted-foreground">
                    쿠팡에서 겪은 부당한 대우나 피해 사례를 알려주세요.
                    <br />철저한 익명 보장을 약속드립니다.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>제보 작성</CardTitle>
                    <CardDescription>상세한 내용은 문제 해결에 큰 도움이 됩니다.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>피해 유형</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="유형을 선택해주세요" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="overwork">과로 / 장시간 노동</SelectItem>
                                                <SelectItem value="injury">산업재해 / 안전사고</SelectItem>
                                                <SelectItem value="privacy">개인정보 유출 / 오남용</SelectItem>
                                                <SelectItem value="unfair">갑질 / 부당 대우</SelectItem>
                                                <SelectItem value="other">기타</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isAnonymous"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                익명으로 제보하기
                                            </FormLabel>
                                            <FormDescription>
                                                체크 시 닉네임이나 개인정보를 수집하지 않습니다.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {!isAnonymous && (
                                <FormField
                                    control={form.control}
                                    name="contactEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>연락처 (이메일)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="example@email.com" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                추가 확인이 필요한 경우 연락드릴 수 있습니다.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>제보 내용</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="구체적인 피해 내용, 일시, 장소 등을 자유롭게 기술해주세요."
                                                className="min-h-[200px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <FormLabel>증빙 자료 (선택)</FormLabel>
                                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-not-allowed opacity-60 bg-muted/50">
                                    <div className="flex flex-col items-center gap-2">
                                        <UploadCloud className="h-8 w-8 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">파일 첨부 기능 준비 중</p>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 제출 중...
                                    </>
                                ) : (
                                    "제보하기"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
