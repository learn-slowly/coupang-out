"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useState } from "react";

const initialState = {
    success: false,
    message: "",
};

export default function AdminLoginPage() {
    // Using a wrapper around the action to match useActionState signature if needed, 
    // or simply handle form submission. Next.js 15 uses useActionState (formerly useFormState).
    // Let's stick to simple form action or useActionState if available in React 19.
    // Given package.json has React 19, we use useActionState (it might be in 'react').
    // Note: useActionState was renamed from useFormState.

    // Actually, for simplicity and compatibility, let's just use a client handler calling server action.
    // But standard way is useActionState.

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError("");

        try {
            const result = await login(formData); // This handles redirect on success
            if (result && !result.success) {
                setError(result.message);
            }
        } catch (e) {
            console.error(e);
            setError("로그인 중 오류가 발생했습니다.");
        } finally {
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
                            {loading ? "확인 중..." : "접속하기"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
