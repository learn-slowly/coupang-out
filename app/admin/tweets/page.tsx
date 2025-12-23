import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { addTweet, deleteTweet, updateTweetOrder } from "../actions";
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
    if (!session) {
        redirect("/admin/login");
    }

    // Fetch tweets
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return (
            <div className="min-h-screen bg-white p-8 text-zinc-900">
                <h1 className="text-2xl font-bold text-red-600">설정 오류</h1>
                <p>환경 변수(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)가 설정되지 않았습니다.</p>
            </div>
        );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: tweets, error } = await supabase
        .from("curated_tweets")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen bg-zinc-50 p-8 text-zinc-900 max-w-4xl mx-auto space-y-8">
            {/* Error Alert */}
            {errorMessage && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-600 font-medium">
                    ⚠️ {decodeURIComponent(errorMessage)}
                </div>
            )}
            <header className="flex justify-between items-center border-b border-zinc-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold">큐레이션 트윗 관리</h1>
                    <p className="text-zinc-500 mt-1">메인 페이지에 노출될 트윗을 관리합니다.</p>
                    <p className="text-xs text-zinc-400 mt-2 bg-zinc-100 dark:bg-zinc-800 p-2 rounded inline-block">
                        💡 <strong>순서 팁:</strong> 숫자가 <strong>작을수록</strong> 먼저(상단에) 노출됩니다. (예: 1번이 가장 위, 0번은 기본값)
                    </p>
                </div>
                <form action={async () => {
                    "use server"
                    const { logout } = await import("../actions");
                    await logout();
                }}>
                    <Button variant="outline" className="border-zinc-300 text-zinc-700 hover:bg-zinc-100">
                        로그아웃
                    </Button>
                </form>
            </header>

            {/* Add Form */}
            <Card className="bg-white border-zinc-200 shadow-sm">
                <CardHeader>
                    <CardTitle>새 트윗 추가</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={addTweet} className="flex gap-4">
                        <Input
                            name="url"
                            placeholder="트윗 URL 예: https://twitter.com/user/status/1234567890"
                            className="flex-1 bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400"
                            required
                        />
                        <Button type="submit" className="bg-zinc-900 text-white hover:bg-zinc-800">
                            추가하기
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">등록된 트윗 ({tweets?.length || 0})</h2>

                {tweets?.length === 0 ? (
                    <div className="p-8 text-center border border-zinc-200 rounded-xl bg-white text-zinc-500">
                        등록된 트윗이 없습니다. URL을 입력해 추가해주세요.
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {tweets?.map((tweet) => (
                            <div key={tweet.id} className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-lg group hover:border-zinc-300 transition-colors shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-zinc-500">
                                        {tweet.display_order ?? 0}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-mono text-lg font-medium text-zinc-900">{tweet.tweet_id}</p>
                                        <a
                                            href={`https://twitter.com/i/status/${tweet.tweet_id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-zinc-500 flex items-center gap-1 hover:text-blue-600"
                                        >
                                            원본 보기 <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <form action={updateTweetOrder} className="flex items-center gap-2">
                                        <input type="hidden" name="id" value={tweet.id} />
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-zinc-400">순서</span>
                                            <Input
                                                type="number"
                                                name="order"
                                                defaultValue={tweet.display_order ?? 0}
                                                className="w-16 h-8 text-sm bg-white border-zinc-300"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="secondary"
                                            size="sm"
                                            className="h-8 hover:bg-zinc-200"
                                        >
                                            저장
                                        </Button>
                                    </form>

                                    <form action={deleteTweet}>
                                        <input type="hidden" name="id" value={tweet.id} />
                                        <Button
                                            type="submit"
                                            variant="destructive"
                                            size="sm"
                                            className="h-8 opacity-70 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
