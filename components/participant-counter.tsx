"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export function ParticipantCounter() {
    const [count, setCount] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCount = async () => {
            if (!supabase) {
                setLoading(false);
                return;
            }

            const { count } = await supabase
                .from('mission_messages')
                .select('*', { count: 'exact', head: true });

            if (count !== null) {
                setCount(count);
            }
            setLoading(false);
        }

        fetchCount();
    }, [])

    if (loading) {
        return <span className="inline-flex items-center"><Loader2 className="h-4 w-4 animate-spin mr-1" /> 불러오는 중...</span>
    }

    return (
        <span>현재 {(count || 0).toLocaleString()}명 참여 중 &rarr;</span>
    )
}
