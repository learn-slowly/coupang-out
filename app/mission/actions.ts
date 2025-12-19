'use server'

import { supabaseAdmin } from "@/lib/supabase-admin"
import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"
import { headers } from "next/headers"

interface CreatePostParams {
    image_url: string
    comment?: string
    captchaToken: string
}

export async function createMissionPost(params: CreatePostParams) {
    try {
        const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1"

        // 1. Rate Limiting (Optional: Skip if envs missing)
        if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
            const ratelimit = new Ratelimit({
                redis: Redis.fromEnv(),
                limiter: Ratelimit.slidingWindow(5, "10 m"), // 5 requests per 10 mins
                analytics: true,
            })

            const { success } = await ratelimit.limit(`mission_upload_${ip}`)
            if (!success) {
                return { success: false, message: "너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요." }
            }
        }

        // 2. reCAPTCHA Verification (Optional: Skip if secret missing)
        if (process.env.RECAPTCHA_SECRET_KEY) {
            const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${params.captchaToken}`
            })
            const data = await response.json()
            if (!data.success || data.score < 0.5) {
                return { success: false, message: "비정상적인 접근이 감지되었습니다. (reCAPTCHA)" }
            }
        }

        // 3. Insert into DB
        // 3. Insert into DB
        let sbClient = supabaseAdmin;

        // Fallback: Use Anon Key if Admin Key is missing (Works if RLS allows public insert)
        if (!sbClient) {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            if (supabaseUrl && supabaseAnonKey) {
                const { createClient } = require('@supabase/supabase-js');
                sbClient = createClient(supabaseUrl, supabaseAnonKey);
            }
        }

        if (!sbClient) {
            console.error("Supabase Client could not be initialized.");
            return { success: false, message: "서버 설정 오류: 관리자 키가 없습니다. (ENV 확인 필요)" }
        }

        const { error } = await sbClient
            .from('mission_posts')
            .insert([
                {
                    image_url: params.image_url,
                    comment: params.comment,
                    is_approved: true // Auto-approve for now
                }
            ])

        if (error) {
            console.error(error)
            return { success: false, message: "DB 저장 실패" }
        }

        return { success: true }

    } catch (error) {
        console.error(error)
        return { success: false, message: "서버 내부 오류가 발생했습니다." }
    }
}
