"use client";

import { login } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError("");

        try {
            const result = await login(formData);

            if (result && result.success) {
                // Success: Redirect manually
                router.push("/admin/tweets");
                // Don't set loading false to avoid button flicker
            } else {
                // Fail
                setError(result?.message || "로그인 실패");
                setLoading(false);
            }
        } catch (e) {
            console.error(e);
            setError("로그인 중 오류가 발생했습니다.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
            <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-zinc-100">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mb-2">
                        <Lock className="w-6 h-6 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">관리자 로그인</CardTitle>
                    <CardDescription className="text-zinc-400">
                        접속을 위해 관리자 PIN 번호를 입력해주세요.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                name="pin"
                                type="password"
                                placeholder="PIN Code"
                                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-red-500"
                                required
                                autoFocus
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-500 font-medium text-center animate-shake">
                                {error}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                            disabled={loading}
                        >
                            {loading ? "접속 중..." : "접속하기"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
