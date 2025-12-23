import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { addTweet, deleteTweet } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ExternalLink } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminTweetsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const sp = await searchParams; // Next.js 15+ needs await for searchParams
    const errorMessage = sp?.error as string | undefined;

    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    // ... existing code ...
    return (
        <div className="min-h-screen bg-zinc-950 p-8 text-white max-w-4xl mx-auto space-y-8">
            {/* Error Alert */}
            {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg text-red-500 font-medium">
                    ⚠️ {decodeURIComponent(errorMessage)}
                </div>
            )}
            <header className="flex justify-between items-center border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold">큐레이션 트윗 관리</h1>
                    <p className="text-zinc-400 mt-1">메인 페이지에 노출될 트윗을 관리합니다.</p>
                </div>
                <form action={async () => {
                    "use server"
                    const { logout } = await import("../actions");
                    await logout();
                }}>
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                        로그아웃
                    </Button>
                </form>
            </header>

            {/* Add Form */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle>새 트윗 추가</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={addTweet} className="flex gap-4">
                        <Input
                            name="url"
                            placeholder="트윗 URL 예: https://twitter.com/user/status/1234567890"
                            className="flex-1 bg-zinc-950 border-zinc-700 text-white"
                            required
                        />
                        <Button type="submit" className="bg-white text-black hover:bg-zinc-200">
                            추가하기
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">등록된 트윗 ({tweets?.length || 0})</h2>

                {tweets?.length === 0 ? (
                    <div className="p-8 text-center border border-zinc-800 rounded-xl bg-zinc-900/50 text-zinc-500">
                        등록된 트윗이 없습니다. URL을 입력해 추가해주세요.
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {tweets?.map((tweet) => (
                            <div key={tweet.id} className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-lg group hover:border-zinc-700 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-500">
                                        X
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-mono text-lg font-medium">{tweet.tweet_id}</p>
                                        <a
                                            href={`https://twitter.com/i/status/${tweet.tweet_id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-zinc-500 flex items-center gap-1 hover:text-blue-400"
                                        >
                                            원본 보기 <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>

                                <form action={deleteTweet}>
                                    <input type="hidden" name="id" value={tweet.id} />
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        size="sm"
                                        className="opacity-70 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" /> 삭제
                                    </Button>
                                </form>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
