import { createClient } from "@supabase/supabase-js"; // Using direct client for simplicity in server component
import { Tweet } from "react-tweet";
import { TwitterTimeline } from "./twitter-timeline"; // Fallback/View All

export async function CuratedTwitterSection() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error("Supabase keys are missing in CuratedTwitterSection");
            return <TwitterTimeline />;
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data: tweets, error } = await supabase
            .from("curated_tweets")
            .select("tweet_id")
            .order("display_order", { ascending: true }) // Or created_at if order is not set
            .order("created_at", { ascending: false })
            .limit(5);

        if (error) {
            console.error("Error fetching tweets:", error);
            // Fallback if table doesn't exist or other DB error
            return <TwitterTimeline />;
        }

        const hasCuratedTweets = tweets && tweets.length > 0;

        if (!hasCuratedTweets) {
            // Fallback to the original widget if no curated tweets are set
            return <TwitterTimeline />;
        }

        return (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6">
                    {tweets.map((t) => (
                        <div key={t.tweet_id} className="light dark:dark break-inside-avoid mb-4 md:mb-6">
                            {/* react-tweet theme support: standard uses light/dark classes or theme prop */}
                            <Tweet id={t.tweet_id} />
                        </div>
                    ))}
                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-xl p-6 text-center border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-bold mb-2">모든 소식을 실시간으로 확인하세요</h3>
                    <p className="text-muted-foreground mb-6">@coupang_out 공식 계정에서 더 많은 이야기를 나눕니다.</p>

                    {/* Collapsible or Link to Widget?
                        User asked for "Bottom View All button -> Modal or Widget".
                        Let's put the widget inside a details/summary or a simple toggle?
                        Or just a link to Twitter.
                        The plan said: "View All" button linking to full timeline or modal.
                        Let's implement a simple details element for now or just the link button from the original component.
                    */}

                    <a
                        href="https://twitter.com/coupang_out"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center py-3 px-6 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-full font-bold transition-transform hover:scale-105 gap-2 shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        트위터에서 전체 보기
                    </a>
                </div>
            </div >
        );
    } catch (e) {
        console.error("Critical error in CuratedTwitterSection:", e);
        return <TwitterTimeline />;
    }
}
