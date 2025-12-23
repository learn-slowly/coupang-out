"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

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
        return { success: true };
    } else {
        return { success: false, message: "비밀번호가 올바르지 않습니다." };
    }
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
    // 1. Check Auth (outside try-catch to allow clean redirect)
    await checkAuth();

    let errorMessage = null;

    try {
        const supabaseAdmin = getSupabaseAdmin();

        const urlOrId = formData.get("url") as string;
        if (!urlOrId) {
            return;
        }

        // Extract ID
        let tweetId = urlOrId;
        const match = urlOrId.match(/(?:twitter|x)\.com\/.*\/status\/(\d+)/);
        if (match && match[1]) {
            tweetId = match[1];
        }

        if (!/^\d+$/.test(tweetId)) {
            errorMessage = "유효한 트윗 ID나 URL이 아닙니다.";
        } else {
            const { error } = await supabaseAdmin
                .from("curated_tweets")
                .insert([{ tweet_id: tweetId }]);

            if (error) {
                console.error("DB Insert Error:", error);
                errorMessage = "DB 저장 실패: " + error.message;
            }
        }

    } catch (e: any) {
        // Log critical server errors
        console.error("Critical error in addTweet:", e);
        errorMessage = "서버 에러가 발생했습니다: " + (e.message || "Unknown error");
    }

    // 2. Redirect Result (Always outside try-catch)
    if (errorMessage) {
        const msg = encodeURIComponent(errorMessage);
        redirect(`/admin/tweets?error=${msg}`);
    }

    // Success path
    revalidatePath('/');
    revalidatePath('/admin/tweets');
    redirect("/admin/tweets");
}

export async function deleteTweet(formData: FormData) {
    await checkAuth();

    let errorMessage = null;

    try {
        const id = formData.get("id") as string;
        const supabaseAdmin = getSupabaseAdmin();

        const { error } = await supabaseAdmin
            .from("curated_tweets")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("DB Delete Error:", error);
            errorMessage = "삭제 실패: " + error.message;
        }
    } catch (e: any) {
        console.error("Critical error in deleteTweet:", e);
        errorMessage = "서버 에러가 발생했습니다: " + (e.message || "Unknown error");
    }

    if (errorMessage) {
        const msg = encodeURIComponent(errorMessage);
        redirect(`/admin/tweets?error=${msg}`);
    }

    revalidatePath('/');
    revalidatePath('/admin/tweets');
    redirect("/admin/tweets");
}
revalidatePath('/');
revalidatePath('/admin/tweets');
redirect("/admin/tweets");
}

export async function updateTweetOrder(formData: FormData) {
    await checkAuth();

    const id = formData.get("id") as string;
    const order = parseInt(formData.get("order") as string);

    if (isNaN(order)) {
        redirect("/admin/tweets?error=" + encodeURIComponent("유효한 순서 번호가 아닙니다."));
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
        .from("curated_tweets")
        .update({ display_order: order })
        .eq("id", id);

    if (error) {
        console.error("Update Order Error:", error);
        redirect("/admin/tweets?error=" + encodeURIComponent("순서 변경 실패: " + error.message));
    }

    revalidatePath('/');
    revalidatePath('/admin/tweets');
    redirect("/admin/tweets");
}
