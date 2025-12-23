"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// Check /lib/supabase.ts existence first? I saw it in file list earlier.
// Wait, I need to check how supabase is initialized in this project.
// In /app/mission/client.tsx it imported from "@/lib/supabase".
// Let's assume "@/lib/supabase" exports `supabase` client. 
// BUT for server actions we usually need a fresh client or use the singleton if it's stateless.
// Let's check /lib/supabase.ts content to be safe.

// Placeholder for now, will read file in next turn to confirm Supabase usage.
// Actually, I can just append to this file later.
// Let's assume standard import for now.

export async function login(formData: FormData) {
    const pin = formData.get("pin") as string;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        console.error("ADMIN_PASSWORD is not set in environment variables");
        return { success: false, message: "서버 설정 오류: 관리자 비밀번호가 설정되지 않았습니다." };
    }

    if (pin === adminPassword) {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        // We cannot redirect inside a try/catch block if we were using one, but here it's fine.
        // However, redirect throws an error, so it should be the last thing.
    } else {
        return { success: false, message: "비밀번호가 올바르지 않습니다." };
    }
    redirect("/admin/tweets");
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
}

// Ensure authed
async function checkAuth() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session) {
        redirect("/admin/login");
    }
}

// Tweet Actions
// Better to create a new client or use the existing one if it allows server usage (service role?).
// For simplicity in this demo, let's try using the imported one, but usually we need `createClient` for server components/actions in Next.js to handle cookies auth (if using Supabase Auth).
// But here we are using custom PIN auth, so we just need a client that can write to DB.
// Using `supabase` from lib might be using ANON key.
// We might need SERVICE_ROLE key for admin writes if RLS blocks ANON.
// The schema said: "-- 관리자만 수정 가능 (Supabase 대시보드 사용 전제) -- 별도 Admin API 구현 시 Service Role 키 사용 예정"
// So we need SERVICE_ROLE key here if we want to write from API.
// Or we update RLS to allow INSERT for everyone (not safe) or use a secret.
// Let's use SERVICE_ROLE key if available in env, or fall back to ANON and hope RLS allows it (it won't for DELETE usually).
// Actually, I should check if I have SUPABASE_SERVICE_ROLE_KEY.
// If I don't, I entered a problem.
// User's PRD mentioned: SUPABASE_SERVICE_ROLE_KEY=
// I'll assume it's available.

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Helper to get admin client lazily
function getSupabaseAdmin() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        throw new Error("Supabase environment variables are missing.");
    }

    return createSupabaseClient(url, key);
}

export async function addTweet(formData: FormData) {
    await checkAuth();

    const supabaseAdmin = getSupabaseAdmin();

    const urlOrId = formData.get("url") as string;
    if (!urlOrId) {
        // For server actions used in <form action>, we can't return object easily unless using useFormState.
        // We will just return, or redirect to error page, or just log.
        // For MVP, we presume client validation (required prop) handles most empty cases.
        return;
    }

    // Extract ID
    // Formats: 
    // https://twitter.com/user/status/1234567890
    // https://x.com/user/status/1234567890
    // 1234567890

    let tweetId = urlOrId;
    const match = urlOrId.match(/(?:twitter|x)\.com\/.*\/status\/(\d+)/);
    if (match && match[1]) {
        tweetId = match[1];
    }

    // Basic validation that it's numbers
    if (!/^\d+$/.test(tweetId)) {
        throw new Error("유효한 트윗 ID나 URL이 아닙니다.");
    }

    const { error } = await supabaseAdmin
        .from("curated_tweets")
        .insert([{ tweet_id: tweetId }]);

    if (error) {
        console.error(error);
        throw new Error("추가 중 오류가 발생했습니다: " + error.message);
    }

    revalidatePath('/'); // Update home page
    revalidatePath('/admin/tweets'); // Update admin list
    redirect("/admin/tweets");
}

export async function deleteTweet(formData: FormData) {
    await checkAuth();
    const id = formData.get("id") as string;

    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
        .from("curated_tweets")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    revalidatePath('/');
    revalidatePath('/admin/tweets');
    redirect("/admin/tweets");
}
