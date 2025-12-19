"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

interface Post {
    id: string
    image_url: string
    comment?: string
    created_at: string
}

export function RecentActivities() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRecentPosts = async () => {
            if (!supabase) {
                setLoading(false);
                return;
            }

            const { data } = await supabase
                .from('mission_posts')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(4);

            if (data) {
                setPosts(data);
            }
            setLoading(false);
        }

        fetchRecentPosts();
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden border shadow-sm h-64">
                        <Skeleton className="w-full h-full" />
                    </div>
                ))}
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                <p className="text-muted-foreground">아직 등록된 인증샷이 없습니다.</p>
                <Link href="/mission" className="text-red-600 font-bold hover:underline mt-2 inline-block">
                    첫 번째 주인공이 되어주세요!
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {posts.map((post) => (
                <div key={post.id} className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden border shadow-sm group">
                    <div className="aspect-square relative flex items-center justify-center bg-zinc-100 overflow-hidden">
                        <Image
                            src={post.image_url}
                            alt="인증샷"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized={true}
                        />
                    </div>
                    {post.comment ? (
                        <div className="p-3">
                            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5em]">{post.comment}</p>
                        </div>
                    ) : (
                        <div className="p-3">
                            <p className="text-xs text-muted-foreground italic">코멘트 없음</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
