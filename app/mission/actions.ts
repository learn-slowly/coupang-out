'use server'

import { supabaseAdmin } from "@/lib/supabase-admin"
import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"
import { headers } from "next/headers"

interface CreateMessageParams {
    email: string
    message: string
    captchaToken: string
}

export async function createMissionPost(params: CreateMessageParams) {
    try {
        const { email, message, captchaToken } = params
        const headersList = await headers()
        const ip = headersList.get("x-forwarded-for") ?? "127.0.0.1"

        // 1. Validation
        if (!email || !email.includes("@")) {
            return { success: false, message: "올바른 이메일 형식이 아닙니다." }
        }
        if (!message || message.trim().length === 0) {
            return { success: false, message: "메시지를 입력해주세요." }
        }
        if (message.length > 500) {
            return { success: false, message: "메시지는 500자 이내로 작성해주세요." }
        }

        // 2. Rate Limiting (Optional)
        if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
            const ratelimit = new Ratelimit({
                redis: Redis.fromEnv(),
                limiter: Ratelimit.slidingWindow(5, "10 m"), // 5 requests per 10 mins
                analytics: true,
            })

            const { success } = await ratelimit.limit(`mission_message_${ip}`)
            if (!success) {
                return { success: false, message: "너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요." }
            }
        }

        // 3. reCAPTCHA Verification
        if (process.env.RECAPTCHA_SECRET_KEY) {
            const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
            })
            const data = await response.json()
            if (!data.success || data.score < 0.5) {
                return { success: false, message: "비정상적인 접근이 감지되었습니다. (reCAPTCHA)" }
            }
        }

        // 4. Insert into DB
        let sbClient = supabaseAdmin;

        if (!sbClient) {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            if (supabaseUrl && supabaseAnonKey) {
                const { createClient } = require('@supabase/supabase-js');
                sbClient = createClient(supabaseUrl, supabaseAnonKey);
            }
        }

        if (!sbClient) {
            return { success: false, message: "서버 설정 오류: 관리자 키가 없습니다." }
        }

        const { error } = await sbClient
            .from('mission_messages')
            .insert([
                {
                    email,
                    message,
                    ip_hash: ip,
                }
            ])

        if (error) {
            console.error("DB Error:", error)
            return { success: false, message: "데이터 저장 실패" }
        }

        return { success: true }

    } catch (error: any) {
        console.error("Server Action Error:", error)

        // Handle specific Supabase/Postgres errors
        if (error?.code === '42P01') {
            return { success: false, message: "시스템 오류: 테이블이 존재하지 않습니다. (관리자에게 문의하세요)" }
        }
        if (error?.code === '42501') {
            return { success: false, message: "시스템 오류: 권한이 없습니다. (RLS 설정을 확인하세요)" }
        }

        return { success: false, message: "서버 내부 오류가 발생했습니다." }
    }
}
