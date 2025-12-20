import { Story, stories } from "./data"
import Hero from "./components/hero"
import StorySection from "./components/story-section"
import Outro from "./components/outro"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "쿠팡이 우리에게서 가져간 것들 | 쿠팡아웃",
    description: "편리함의 이면, 클릭의 비용. 우리가 잃어버린 가치들을 되돌아보는 인터랙티브 다큐멘터리.",
    openGraph: {
        images: ["/opengraph-image"],
    },
}

export default function LossPage() {
    return (
        <main className="bg-zinc-950 h-[100dvh] overflow-y-scroll snap-y snap-mandatory text-white selection:bg-red-500/30 scroll-smooth">
            <Hero />

            <div className="relative">
                {stories.map((story, index) => (
                    <StorySection key={story.id} story={story} index={index} />
                ))}
            </div>

            <Outro />
        </main>
    )
}
